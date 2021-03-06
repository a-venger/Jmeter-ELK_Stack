# BinData -- Binary data manipulator.
# Copyright (c) 2007 - 2016 Dion Mendel.

if RUBY_VERSION <= "1.9"
  fail "BinData requires ruby >= 1.9.3. Use BinData version 1.8.x instead"
end

if RUBY_VERSION == "2.1.0" and RUBY_PATCHLEVEL == "0"
  fail "Ruby 2.1.0p0 has a bug that causes BinData to fail. Upgrade your ruby version"
end

require 'bindata/version'
require 'bindata/array'
require 'bindata/bits'
require 'bindata/buffer'
require 'bindata/choice'
require 'bindata/count_bytes_remaining'
require 'bindata/delayed_io'
require 'bindata/float'
require 'bindata/int'
require 'bindata/primitive'
require 'bindata/record'
require 'bindata/rest'
require 'bindata/skip'
require 'bindata/string'
require 'bindata/stringz'
require 'bindata/struct'
require 'bindata/trace'
require 'bindata/uint8_array'
require 'bindata/virtual'
require 'bindata/alignment'
require 'bindata/warnings'

# = BinData
# 
# A declarative way to read and write structured binary data.
# 
# A full reference manual is available online at
# http://bindata.rubyforge.org/manual.html
#
# == License
#
# BinData is released under the same license as Ruby.
#
# Copyright (c) 2007 - 2016 Dion Mendel.
