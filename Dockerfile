FROM ubuntu

# install packages
RUN apt-get -y update --fix-missing && apt-get -y upgrade

# set as noninteractive to prevent prompts
RUN export DEBIAN_FRONTEND=noninteractive

# install mysql
RUN apt-get install -q -y mysql-server libmysqlclient-dev

# install git and pip
RUN apt-get install -y build-essential git python3-pip

# install node
RUN apt-get install -y software-properties-common apt-transport-https
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv 68576280
RUN apt-add-repository 'deb https://deb.nodesource.com/node_4.x precise main'
RUN apt-get -y update
RUN apt-get install -y nodejs

# install webpack
RUN npm install -g webpack

# install foreman
RUN apt-get -y install ruby
RUN gem install foreman

# install livereload
RUN npm install -g livereload

# setup working directory /voerr
RUN mkdir -p /voerr/src && mkdir -p /voerr/sql && mkdir -p /voerr/scripts
WORKDIR "/voerr"

# install pip packages
ADD requirements.txt /voerr/requirements.txt
RUN pip3 install -r /voerr/requirements.txt

# install node packages
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /voerr/

# add webpack config
ADD webpack.config.js /voerr/webpack.config.js
ADD .babelrc /voerr/.babelrc
ADD .eslintrc /voerr/.eslintrc

# add procfile
ADD Procfile /voerr/Procfile

# add scripts to /voerr
ADD scripts/*.sh /voerr/scripts/
# make scripts executable
RUN chmod +x /voerr/scripts/*.sh

# set mysql `bind-address` to "0.0.0.0" to enable access from outside the container
RUN sed -i -e"s/^bind-address\s*=\s*127.0.0.1/bind-address = 0.0.0.0/" /etc/mysql/my.cnf

# copy sql files
ADD sql/*.sql /voerr/sql/

# expose flask devserver port
EXPOSE 5000

# expose mysql port
EXPOSE 3306

# expose livereload port
EXPOSE 35729

EXPOSE 1989

# run setup script
CMD /voerr/scripts/setup.sh && echo "\nrun 'foreman start' to start voerr\n" && /bin/bash