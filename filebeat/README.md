# Welcome to Filebeat 6.4.1

Filebeat sends log files to Logstash or directly to Elasticsearch.

## Getting Started

To get started with Filebeat, you need to set up Elasticsearch on
your localhost first. After that, start Filebeat with:

     ./filebeat -c filebeat.yml -e

This will start Filebeat and send the data to your Elasticsearch
instance. To load the dashboards for Filebeat into Kibana, run:

    ./filebeat setup -e

For further steps visit the
[Getting started](https://www.elastic.co/guide/en/beats/filebeat/6.4/filebeat-getting-started.html) guide.

## Documentation

Visit [Elastic.co Docs](https://www.elastic.co/guide/en/beats/filebeat/6.4/index.html)
for the full Filebeat documentation.

## Release notes

https://www.elastic.co/guide/en/beats/libbeat/6.4/release-notes-6.4.1.html
