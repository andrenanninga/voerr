@echo off

:: set `drive` as current drive without path
:: set drive=%~d0
:: :: remove trailing ":"
:: set drive=%drive:~0,1%
:: :: make lowercase
:: set drive=%drive:C=c%
:: set drive=%drive:D=d%
:: set drive=%drive:E=e%
:: set drive=%drive:F=f%
set drive=c

:: set `directory` as current path without drive
set directory=%~p0
:: replace backslashes with forward slashes
set directory=%directory:\=/%
:: remove '/scripts' from the end of the directory path
set directory=%directory:~0,-8%

:: set `srcdir` as "/"+`drive`+`directory`+"src"
set srcdir=/%drive%%directory%src

:: save full command to run docker
set command=docker run^ -it -p 5000:5000 -p 3306:3306 -p 35729:35729 -v %srcdir%:/voerr/src voerr-dev

:: echo command for manual use
echo %command%

:: run command
%command%