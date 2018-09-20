:: Run elasticsearch 
start call .\elasticsearch\bin\elasticsearch.bat

:: Run kibana server
:: Kibana will be up on http://127.0.0.1:5601
start call .\kibana\bin\kibana.bat

:: Run logstash and specify which pipeline to use
:: Current version of ELK stack has demo first-pipeline.conf config
cd .\logstash\
start call .\bin\logstash -r -f first-pipeline.conf

:: Run filebeat
cd ..\filebeat\
start call .\filebeat.exe -e -c filebeat.yml