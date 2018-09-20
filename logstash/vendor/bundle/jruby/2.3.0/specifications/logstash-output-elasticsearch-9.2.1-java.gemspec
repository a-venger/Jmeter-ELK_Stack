# -*- encoding: utf-8 -*-
# stub: logstash-output-elasticsearch 9.2.1 java lib

Gem::Specification.new do |s|
  s.name = "logstash-output-elasticsearch".freeze
  s.version = "9.2.1"
  s.platform = "java".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "logstash_group" => "output", "logstash_plugin" => "true" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Elastic".freeze]
  s.date = "2018-08-17"
  s.description = "This gem is a Logstash plugin required to be installed on top of the Logstash core pipeline using $LS_HOME/bin/logstash-plugin install gemname. This gem is not a stand-alone program".freeze
  s.email = "info@elastic.co".freeze
  s.homepage = "http://logstash.net/".freeze
  s.licenses = ["apache-2.0".freeze]
  s.rubygems_version = "2.6.13".freeze
  s.summary = "Stores logs in Elasticsearch".freeze

  s.installed_by_version = "2.6.13" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<manticore>.freeze, ["< 1.0.0", ">= 0.5.4"])
      s.add_runtime_dependency(%q<stud>.freeze, [">= 0.0.17", "~> 0.0"])
      s.add_runtime_dependency(%q<cabin>.freeze, ["~> 0.6"])
      s.add_runtime_dependency(%q<logstash-core-plugin-api>.freeze, ["<= 2.99", ">= 1.60"])
      s.add_development_dependency(%q<logstash-codec-plain>.freeze, [">= 0"])
      s.add_development_dependency(%q<logstash-devutils>.freeze, [">= 0"])
      s.add_development_dependency(%q<flores>.freeze, [">= 0"])
      s.add_development_dependency(%q<elasticsearch>.freeze, [">= 0"])
    else
      s.add_dependency(%q<manticore>.freeze, ["< 1.0.0", ">= 0.5.4"])
      s.add_dependency(%q<stud>.freeze, [">= 0.0.17", "~> 0.0"])
      s.add_dependency(%q<cabin>.freeze, ["~> 0.6"])
      s.add_dependency(%q<logstash-core-plugin-api>.freeze, ["<= 2.99", ">= 1.60"])
      s.add_dependency(%q<logstash-codec-plain>.freeze, [">= 0"])
      s.add_dependency(%q<logstash-devutils>.freeze, [">= 0"])
      s.add_dependency(%q<flores>.freeze, [">= 0"])
      s.add_dependency(%q<elasticsearch>.freeze, [">= 0"])
    end
  else
    s.add_dependency(%q<manticore>.freeze, ["< 1.0.0", ">= 0.5.4"])
    s.add_dependency(%q<stud>.freeze, [">= 0.0.17", "~> 0.0"])
    s.add_dependency(%q<cabin>.freeze, ["~> 0.6"])
    s.add_dependency(%q<logstash-core-plugin-api>.freeze, ["<= 2.99", ">= 1.60"])
    s.add_dependency(%q<logstash-codec-plain>.freeze, [">= 0"])
    s.add_dependency(%q<logstash-devutils>.freeze, [">= 0"])
    s.add_dependency(%q<flores>.freeze, [">= 0"])
    s.add_dependency(%q<elasticsearch>.freeze, [">= 0"])
  end
end
