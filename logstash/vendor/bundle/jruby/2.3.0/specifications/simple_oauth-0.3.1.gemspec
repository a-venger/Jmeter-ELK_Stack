# -*- encoding: utf-8 -*-
# stub: simple_oauth 0.3.1 ruby lib

Gem::Specification.new do |s|
  s.name = "simple_oauth".freeze
  s.version = "0.3.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Steve Richert".freeze, "Erik Michaels-Ober".freeze]
  s.date = "2014-12-28"
  s.description = "Simply builds and verifies OAuth headers".freeze
  s.email = ["steve.richert@gmail.com".freeze, "sferik@gmail.com".freeze]
  s.homepage = "https://github.com/laserlemon/simple_oauth".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "2.6.13".freeze
  s.summary = "Simply builds and verifies OAuth headers".freeze

  s.installed_by_version = "2.6.13" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<bundler>.freeze, ["~> 1.0"])
    else
      s.add_dependency(%q<bundler>.freeze, ["~> 1.0"])
    end
  else
    s.add_dependency(%q<bundler>.freeze, ["~> 1.0"])
  end
end
