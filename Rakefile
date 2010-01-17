
myname = File.dirname(__FILE__).split("/").last
require 'crxmake'


desc "Finds your last tag"
task :default do
  last_tag = `git describe 2>/dev/null`
  puts (last_tag.empty? ? "Cannot find last tag" : "Last tag: #{last_tag}")
end


desc "Build a .crx file that Chrome can load"
task :build, [:version] do |t, args|
  args.with_defaults(:version => "Alpha")

  unless File.exists?("key.pem")
    CrxMake.make(
      :ex_dir => "./src",
      :pkey_output => "./key.pem",
      :crx_output => "./#{myname}-#{args.version}.crx",
      :verbose => true
    )
  else
    CrxMake.make(
      :ex_dir => "./src",
      :pkey => "./key.pem",
      :crx_output => "./#{myname}-#{args.version}.crx",
      :verbose => true
    )
  end
end


desc "Update the version number and create a tag"
task :tag, [:version] do |t, args|
  new_file = File.read("src/manifest.json").gsub(/"version": ".+",/, %Q|"version": "#{args.version}",|)
  File.open("src/manifest.json", "w") {|f| f << new_file}

  new_file = File.read("updates.xml").gsub(/version='.+'/, "version='#{args.version}'").gsub(/tender-checker-.+\.crx/, "tender-checker-#{args.version}.crx")
  File.open("updates.xml", "w") {|f| f << new_file}

  `git commit -m "Updating version number" -- src/manifest.json updates.xml`
  `git tag -a -m "Build #{args.version}" v#{args.version}`
end


desc "Tag, build and upload a new version"
task :release, [:version] => [:tag, :build] do |t, args|
end