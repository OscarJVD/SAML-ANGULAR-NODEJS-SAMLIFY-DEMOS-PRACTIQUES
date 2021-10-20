@echo off
cls
if "%~1"=="" GOTO :syntax

set YR=%DATE:~10,4%
set MO=%DATE:~4,2%
set DA=%DATE:~7,2%

set HR=%TIME: =0%
set HR=%HR:~0,2%
set MI=%TIME:~3,2%
set SC=%TIME:~6,2%

echo.
echo.
echo.
echo Copy resources needed for operation according to build target.
echo.
echo.
pause

if %~1==production GOTO :production
if %~1==staging GOTO :staging
if %~1==localhost GOTO :localhost
GOTO :syntax

:production
copy resources\https-instance_production.config .ebextensions\https-instance.config
copy resources\private-key_production.pem server\config\private-key.pem
copy resources\COMPANY_IDP_metadata_production.xml server\config\COMPANY_IDP_metadata.xml
copy resources\COMPANY_SP_metadata_production.xml server\config\COMPANY_SP_metadata.xml
GOTO :buildit

:staging
copy resources\https-instance_staging.config .ebextensions\https-instance.config
copy resources\private-key_staging.pem server\config\private-key.pem
copy resources\COMPANY_IDP_metadata_staging.xml server\config\COMPANY_IDP_metadata.xml
copy resources\COMPANY_SP_metadata_staging.xml server\config\COMPANY_SP_metadata.xml
GOTO :buildit

:localhost
REM No https-instance for localhost running
copy resources\private-key_localhost.pem server\config\private-key.pem
copy resources\COMPANY_IDP_metadata_localhost.xml server\config\COMPANY_IDP_metadata.xml
copy resources\COMPANY_SP_metadata_localhost.xml server\config\COMPANY_SP_metadata.xml
REM Skip zip build for local running
GOTO :end

:buildit
echo.
echo.
echo.
echo Prepare "%Filename%" for upload to AWS Elastic Beanstalk.
echo.
echo This batch file uses WinZip command line tools installed to the default location.
echo.
echo.
pause

set Filename=COMPANY-%YR%%MO%%DA%%HR%%MI%%SC%.zip

"C:\Program Files\WinZip\wzzip.exe" -r -P %Filename% .ebextensions\*.*
timeout 2
"C:\Program Files\WinZip\wzzip.exe" -r -P %Filename% public\*.*
timeout 2
"C:\Program Files\WinZip\wzzip.exe" -r -P %Filename% server\*.*
timeout 2
"C:\Program Files\WinZip\wzzip.exe" -r -P %Filename% src\*.*
timeout 2
"C:\Program Files\WinZip\wzzip.exe" -P %Filename% express.js
timeout 2
"C:\Program Files\WinZip\wzzip.exe" -P %Filename% package.json
timeout 2

REM Copy the file to the build archive
copy %Filename% \\BACKUP_SYSTEM\public\projects\COMPANY\builds\
goto :end

:syntax
echo.
echo.
echo.
echo Error invoking build. Usage is Build staging, Build production, or Build localhost
echo.
echo.
echo.

:end