# Prerequisites
To run this project you need to have [Java](https://java.com/ru/download/) on your computer.

You can simply check if Java is installed on your computer by typing ```java -version``` in command line
## Run shared Performance QA Framework
1. Clone the repository ```git clone https://github.com/a-venger/Jmeter-ELK_Stack.git``` or simply download zip archive.
1. Open Jmeter-ELK_Stack dir
1. Execute run_framework.bat file
## Instruction how to run it manually:
1. Run elasticsearch 
```start call .\elasticsearch\bin\elasticsearch.bat```
1. Run kibana server. 
```start call .\kibana\bin\kibana.bat```
1. Run logstash and specify which pipeline to use
```cd .\logstash\```
```start call .\bin\logstash -r -f first-pipeline.conf```
1. Run filebeat
```cd ..\filebeat\```
```start call .\filebeat.exe -e -c filebeat.yml```
## Data exploration in Kibana
Kibana is used for visualization and data investigation.

Navigate to http://localhost:5601