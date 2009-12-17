
myname = File.dirname(__FILE__).split("/").last
require 'crxmake'

task :default do
  unless File.exists?("key.pem")
    CrxMake.make(
      :ex_dir => "./src",
      :pkey_output => "./key.pem",
      :crx_output => "./#{myname}.crx",
      :verbose => true
    )
  else
    CrxMake.make(
      :ex_dir => "./src",
      :pkey => "./key.pem",
      :crx_output => "./#{myname}.crx",
      :verbose => true
    )
  end
end
