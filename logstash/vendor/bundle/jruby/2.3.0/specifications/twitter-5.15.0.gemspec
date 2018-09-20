# -*- encoding: utf-8 -*-
# stub: twitter 5.15.0 ruby lib

Gem::Specification.new do |s|
  s.name = "twitter".freeze
  s.version = "5.15.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.3.5".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Erik Michaels-Ober".freeze, "John Nunemaker".freeze, "Wynn Netherland".freeze, "Steve Richert".freeze, "Steve Agalloco".freeze]
  s.date = "2015-09-06"
  s.description = "A Ruby interface to the Twitter API.".freeze
  s.email = ["sferik@gmail.com".freeze]
  s.homepage = "http://sferik.github.com/twitter/".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "2.6.13".freeze
  s.summary = "A Ruby interface to the Twitter API.".freeze

  s.installed_by_version = "2.6.13" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<addressable>.freeze, ["~> 2.3"])
      s.add_runtime_dependency(%q<buftok>.freeze, ["~> 0.2.0"])
      s.add_runtime_dependency(%q<equalizer>.freeze, ["= 0.0.10"])
      s.add_runtime_dependency(%q<faraday>.freeze, ["~> 0.9.0"])
      s.add_runtime_dependency(%q<http>.freeze, ["< 0.10", ">= 0.4"])
      s.add_runtime_dependency(%q<http_parser.rb>.freeze, ["~> 0.6.0"])
      s.add_runtime_dependency(%q<json>.freeze, ["~> 1.8"])
      s.add_runtime_dependency(%q<memoizable>.freeze, ["~> 0.4.0"])
      s.add_runtime_dependency(%q<naught>.freeze, ["~> 1.0"])
      s.add_runtime_dependency(%q<simple_oauth>.freeze, ["~> 0.3.0"])
      s.add_development_dependency(%q<bundler>.freeze, ["~> 1.0"])
    else
      s.add_dependency(%q<addressable>.freeze, ["~> 2.3"])
      s.add_dependency(%q<buftok>.freeze, ["~> 0.2.0"])
      s.add_dependency(%q<equalizer>.freeze, ["= 0.0.10"])
      s.add_dependency(%q<faraday>.freeze, ["~> 0.9.0"])
      s.add_dependency(%q<http>.freeze, ["< 0.10", ">= 0.4"])
      s.add_dependency(%q<http_parser.rb>.freeze, ["~> 0.6.0"])
      s.add_dependency(%q<json>.freeze, ["~> 1.8"])
      s.add_dependency(%q<memoizable>.freeze, ["~> 0.4.0"])
      s.add_dependency(%q<naught>.freeze, ["~> 1.0"])
      s.add_dependency(%q<simple_oauth>.freeze, ["~> 0.3.0"])
      s.add_dependency(%q<bundler>.freeze, ["~> 1.0"])
    end
  else
    s.add_dependency(%q<addressable>.freeze, ["~> 2.3"])
    s.add_dependency(%q<buftok>.freeze, ["~> 0.2.0"])
    s.add_dependency(%q<equalizer>.freeze, ["= 0.0.10"])
    s.add_dependency(%q<faraday>.freeze, ["~> 0.9.0"])
    s.add_dependency(%q<http>.freeze, ["< 0.10", ">= 0.4"])
    s.add_dependency(%q<http_parser.rb>.freeze, ["~> 0.6.0"])
    s.add_dependency(%q<json>.freeze, ["~> 1.8"])
    s.add_dependency(%q<memoizable>.freeze, ["~> 0.4.0"])
    s.add_dependency(%q<naught>.freeze, ["~> 1.0"])
    s.add_dependency(%q<simple_oauth>.freeze, ["~> 0.3.0"])
    s.add_dependency(%q<bundler>.freeze, ["~> 1.0"])
  end
end
