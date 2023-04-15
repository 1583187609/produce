(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{376:function(v,_,o){"use strict";o.r(_);var d=o(15),e=Object(d.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h2",{attrs:{id:"表达式全集"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#表达式全集"}},[v._v("#")]),v._v(" 表达式全集")]),v._v(" "),_("p",[v._v("字符")]),v._v(" "),_("p",[v._v("描述")]),v._v(" "),_("p",[v._v("\\")]),v._v(" "),_("p",[v._v("将下一个字符标记为一个特殊字符、或一个原义字符、或一个向后引用、或一个八进制转义符。例如，“"),_("code",[v._v("n")]),v._v("”匹配字符“"),_("code",[v._v("n")]),v._v("”。“"),_("code",[v._v("\\n")]),v._v("”匹配一个换行符。串行“"),_("code",[v._v("\\\\")]),v._v("”匹配“"),_("code",[v._v("\\")]),v._v("”而“"),_("code",[v._v("\\(")]),v._v("”则匹配“"),_("code",[v._v("(")]),v._v("”。")]),v._v(" "),_("p",[v._v("^")]),v._v(" "),_("p",[v._v("匹配输入字符串的开始位置。如果设置了RegExp对象的Multiline属性，^也匹配“"),_("code",[v._v("\\n")]),v._v("”或“"),_("code",[v._v("\\r")]),v._v("”之后的位置。")]),v._v(" "),_("p",[v._v("$")]),v._v(" "),_("p",[v._v("匹配输入字符串的结束位置。如果设置了RegExp对象的Multiline属性，$也匹配“"),_("code",[v._v("\\n")]),v._v("”或“"),_("code",[v._v("\\r")]),v._v("”之前的位置。")]),v._v(" "),_("p",[v._v("*")]),v._v(" "),_("p",[v._v("匹配前面的子表达式零次或多次。例如，zo*能匹配“"),_("code",[v._v("z")]),v._v("”以及“"),_("code",[v._v("zoo")]),v._v("”。*等价于{0,}。")]),v._v(" "),_("ul",[_("li")]),v._v(" "),_("p",[v._v("匹配前面的子表达式一次或多次。例如，“"),_("code",[v._v("zo+")]),v._v("”能匹配“"),_("code",[v._v("zo")]),v._v("”以及“"),_("code",[v._v("zoo")]),v._v("”，但不能匹配“"),_("code",[v._v("z")]),v._v("”。+等价于{1,}。")]),v._v(" "),_("p",[v._v("?")]),v._v(" "),_("p",[v._v("匹配前面的子表达式零次或一次。例如，“"),_("code",[v._v("do(es)?")]),v._v("”可以匹配“"),_("code",[v._v("does")]),v._v("”或“"),_("code",[v._v("does")]),v._v("”中的“"),_("code",[v._v("do")]),v._v("”。?等价于{0,1}。")]),v._v(" "),_("p",[v._v("{n}")]),v._v(" "),_("p",[v._v("n是一个非负整数。匹配确定的n次。例如，“"),_("code",[v._v("o{2}")]),v._v("”不能匹配“"),_("code",[v._v("Bob")]),v._v("”中的“"),_("code",[v._v("o")]),v._v("”，但是能匹配“"),_("code",[v._v("food")]),v._v("”中的两个o。")]),v._v(" "),_("p",[v._v("{n,}")]),v._v(" "),_("p",[v._v("n是一个非负整数。至少匹配n次。例如，“"),_("code",[v._v("o{2,}")]),v._v("”不能匹配“"),_("code",[v._v("Bob")]),v._v("”中的“"),_("code",[v._v("o")]),v._v("”，但能匹配“"),_("code",[v._v("foooood")]),v._v("”中的所有o。“"),_("code",[v._v("o{1,}")]),v._v("”等价于“"),_("code",[v._v("o+")]),v._v("”。“"),_("code",[v._v("o{0,}")]),v._v("”则等价于“"),_("code",[v._v("o*")]),v._v("”。")]),v._v(" "),_("p",[v._v("{n,m}")]),v._v(" "),_("p",[v._v("m和n均为非负整数，其中n<=m。最少匹配n次且最多匹配m次。例如，“"),_("code",[v._v("o{1,3}")]),v._v("”将匹配“"),_("code",[v._v("fooooood")]),v._v("”中的前三个o。“"),_("code",[v._v("o{0,1}")]),v._v("”等价于“"),_("code",[v._v("o?")]),v._v("”。请注意在逗号和两个数之间不能有空格。")]),v._v(" "),_("p",[v._v("?")]),v._v(" "),_("p",[v._v("当该字符紧跟在任何一个其他限制符（*,+,?，{n}，{n,}，{n,m}）后面时，匹配模式是非贪婪的。非贪婪模式尽可能少的匹配所搜索的字符串，而默认的贪婪模式则尽可能多的匹配所搜索的字符串。例如，对于字符串“"),_("code",[v._v("oooo")]),v._v("”，“"),_("code",[v._v("o+?")]),v._v("”将匹配单个“"),_("code",[v._v("o")]),v._v("”，而“"),_("code",[v._v("o+")]),v._v("”将匹配所有“"),_("code",[v._v("o")]),v._v("”。")]),v._v(" "),_("p",[v._v(".")]),v._v(" "),_("p",[v._v("匹配除“"),_("code",[v._v("\\``n")]),v._v("”之外的任何单个字符。要匹配包括“"),_("code",[v._v("\\``n")]),v._v("”在内的任何字符，请使用像“"),_("code",[v._v("(.|\\n)")]),v._v("”的模式。")]),v._v(" "),_("p",[v._v("(pattern)")]),v._v(" "),_("p",[v._v("匹配pattern并获取这一匹配。所获取的匹配可以从产生的Matches集合得到，在VBScript中使用SubMatches集合，在JScript中则使用$0…$9属性。要匹配圆括号字符，请使用“"),_("code",[v._v("\\(")]),v._v("”或“"),_("code",[v._v("\\)")]),v._v("”。")]),v._v(" "),_("p",[v._v("(?:pattern)")]),v._v(" "),_("p",[v._v("匹配pattern但不获取匹配结果，也就是说这是一个非获取匹配，不进行存储供以后使用。这在使用或字符“"),_("code",[v._v("(|)")]),v._v("”来组合一个模式的各个部分是很有用。例如“"),_("code",[v._v("industr(?:y|ies)")]),v._v("”就是一个比“"),_("code",[v._v("industry|industries")]),v._v("”更简略的表达式。")]),v._v(" "),_("p",[v._v("(?=pattern)")]),v._v(" "),_("p",[v._v("正向肯定预查，在任何匹配pattern的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。例如，“"),_("code",[v._v("Windows(?=95|98|NT|2000)")]),v._v("”能匹配“"),_("code",[v._v("Windows2000")]),v._v("”中的“"),_("code",[v._v("Windows")]),v._v("”，但不能匹配“"),_("code",[v._v("Windows3.1")]),v._v("”中的“"),_("code",[v._v("Windows")]),v._v("”。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始。")]),v._v(" "),_("p",[v._v("(?!pattern)")]),v._v(" "),_("p",[v._v("正向否定预查，在任何不匹配pattern的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。例如“"),_("code",[v._v("Windows(?!95|98|NT|2000)")]),v._v("”能匹配“"),_("code",[v._v("Windows3.1")]),v._v("”中的“"),_("code",[v._v("Windows")]),v._v("”，但不能匹配“"),_("code",[v._v("Windows2000")]),v._v("”中的“"),_("code",[v._v("Windows")]),v._v("”。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始")]),v._v(" "),_("p",[v._v("(?<=pattern)")]),v._v(" "),_("p",[v._v("反向肯定预查，与正向肯定预查类拟，只是方向相反。例如，“"),_("code",[v._v("(?<=95|98|NT|2000)Windows")]),v._v("”能匹配“"),_("code",[v._v("2000Windows")]),v._v("”中的“"),_("code",[v._v("Windows")]),v._v("”，但不能匹配“"),_("code",[v._v("3.1Windows")]),v._v("”中的“"),_("code",[v._v("Windows")]),v._v("”。")]),v._v(" "),_("p",[v._v("(?")]),v._v(" "),_("p",[v._v("反向否定预查，与正向否定预查类拟，只是方向相反。例如“"),_("code",[v._v("(?”能匹配“`3.1Windows`”中的“`Windows`”，但不能匹配“`2000Windows`”中的“`Windows`”。")])]),v._v(" "),_("p",[v._v("x|y")]),v._v(" "),_("p",[v._v("匹配x或y。例如，“"),_("code",[v._v("z|food")]),v._v("”能匹配“"),_("code",[v._v("z")]),v._v("”或“"),_("code",[v._v("food")]),v._v("”。“"),_("code",[v._v("(z|f)ood")]),v._v("”则匹配“"),_("code",[v._v("zood")]),v._v("”或“"),_("code",[v._v("food")]),v._v("”。")]),v._v(" "),_("p",[v._v("[xyz]")]),v._v(" "),_("p",[v._v("字符集合。匹配所包含的任意一个字符。例如，“"),_("code",[v._v("[abc]")]),v._v("”可以匹配“"),_("code",[v._v("plain")]),v._v("”中的“"),_("code",[v._v("a")]),v._v("”。")]),v._v(" "),_("p",[v._v("[^xyz]")]),v._v(" "),_("p",[v._v("负值字符集合。匹配未包含的任意字符。例如，“"),_("code",[v._v("[^abc]")]),v._v("”可以匹配“"),_("code",[v._v("plain")]),v._v("”中的“"),_("code",[v._v("p")]),v._v("”。")]),v._v(" "),_("p",[v._v("[a-z]")]),v._v(" "),_("p",[v._v("字符范围。匹配指定范围内的任意字符。例如，“"),_("code",[v._v("[a-z]")]),v._v("”可以匹配“"),_("code",[v._v("a")]),v._v("”到“"),_("code",[v._v("z")]),v._v("”范围内的任意小写字母字符。")]),v._v(" "),_("p",[v._v("[^a-z]")]),v._v(" "),_("p",[v._v("负值字符范围。匹配任何不在指定范围内的任意字符。例如，“"),_("code",[v._v("[^a-z]")]),v._v("”可以匹配任何不在“"),_("code",[v._v("a")]),v._v("”到“"),_("code",[v._v("z")]),v._v("”范围内的任意字符。")]),v._v(" "),_("p",[v._v("\\b")]),v._v(" "),_("p",[v._v("匹配一个单词边界，也就是指单词和空格间的位置。例如，“"),_("code",[v._v("er\\b")]),v._v("”可以匹配“"),_("code",[v._v("never")]),v._v("”中的“"),_("code",[v._v("er")]),v._v("”，但不能匹配“"),_("code",[v._v("verb")]),v._v("”中的“"),_("code",[v._v("er")]),v._v("”。")]),v._v(" "),_("p",[v._v("\\B")]),v._v(" "),_("p",[v._v("匹配非单词边界。“"),_("code",[v._v("er\\B")]),v._v("”能匹配“"),_("code",[v._v("verb")]),v._v("”中的“"),_("code",[v._v("er")]),v._v("”，但不能匹配“"),_("code",[v._v("never")]),v._v("”中的“"),_("code",[v._v("er")]),v._v("”。")]),v._v(" "),_("p",[v._v("\\cx")]),v._v(" "),_("p",[v._v("匹配由x指明的控制字符。例如，\\cM匹配一个Control-M或回车符。x的值必须为A-Z或a-z之一。否则，将c视为一个原义的“"),_("code",[v._v("c")]),v._v("”字符。")]),v._v(" "),_("p",[v._v("\\d")]),v._v(" "),_("p",[v._v("匹配一个数字字符。等价于[0-9]。")]),v._v(" "),_("p",[v._v("\\D")]),v._v(" "),_("p",[v._v("匹配一个非数字字符。等价于[^0-9]。")]),v._v(" "),_("p",[v._v("\\f")]),v._v(" "),_("p",[v._v("匹配一个换页符。等价于\\x0c和\\cL。")]),v._v(" "),_("p",[v._v("\\n")]),v._v(" "),_("p",[v._v("匹配一个换行符。等价于\\x0a和\\cJ。")]),v._v(" "),_("p",[v._v("\\r")]),v._v(" "),_("p",[v._v("匹配一个回车符。等价于\\x0d和\\cM。")]),v._v(" "),_("p",[v._v("\\s")]),v._v(" "),_("p",[v._v("匹配任何空白字符，包括空格、制表符、换页符等等。等价于[ \\f\\n\\r\\t\\v]。")]),v._v(" "),_("p",[v._v("\\S")]),v._v(" "),_("p",[v._v("匹配任何非空白字符。等价于[^ \\f\\n\\r\\t\\v]。")]),v._v(" "),_("p",[v._v("\\t")]),v._v(" "),_("p",[v._v("匹配一个制表符。等价于\\x09和\\cI。")]),v._v(" "),_("p",[v._v("\\v")]),v._v(" "),_("p",[v._v("匹配一个垂直制表符。等价于\\x0b和\\cK。")]),v._v(" "),_("p",[v._v("\\w")]),v._v(" "),_("p",[v._v("匹配包括下划线的任何单词字符。等价于“"),_("code",[v._v("[A-Za-z0-9_]")]),v._v("”。")]),v._v(" "),_("p",[v._v("\\W")]),v._v(" "),_("p",[v._v("匹配任何非单词字符。等价于“"),_("code",[v._v("[^A-Za-z0-9_]")]),v._v("”。")]),v._v(" "),_("p",[v._v("\\xn")]),v._v(" "),_("p",[v._v("匹配n，其中n为十六进制转义值。十六进制转义值必须为确定的两个数字长。例如，“"),_("code",[v._v("\\x41")]),v._v("”匹配“"),_("code",[v._v("A")]),v._v("”。“"),_("code",[v._v("\\x041")]),v._v("”则等价于“"),_("code",[v._v("\\x04&1")]),v._v("”。正则表达式中可以使用ASCII编码。.")]),v._v(" "),_("p",[v._v("\\num")]),v._v(" "),_("p",[v._v("匹配num，其中num是一个正整数。对所获取的匹配的引用。例如，“"),_("code",[v._v("(.)\\1")]),v._v("”匹配两个连续的相同字符。")]),v._v(" "),_("p",[v._v("\\n")]),v._v(" "),_("p",[v._v("标识一个八进制转义值或一个向后引用。如果\\n之前至少n个获取的子表达式，则n为向后引用。否则，如果n为八进制数字（0-7），则n为一个八进制转义值。")]),v._v(" "),_("p",[v._v("\\nm")]),v._v(" "),_("p",[v._v("标识一个八进制转义值或一个向后引用。如果\\nm之前至少有nm个获得子表达式，则nm为向后引用。如果\\nm之前至少有n个获取，则n为一个后跟文字m的向后引用。如果前面的条件都不满足，若n和m均为八进制数字（0-7），则\\nm将匹配八进制转义值nm。")]),v._v(" "),_("p",[v._v("\\nml")]),v._v(" "),_("p",[v._v("如果n为八进制数字（0-3），且m和l均为八进制数字（0-7），则匹配八进制转义值nml。")]),v._v(" "),_("p",[v._v("\\un")]),v._v(" "),_("p",[v._v("匹配n，其中n是一个用四个十六进制数字表示的Unicode字符。例如，\\u00A9匹配版权符号（©）。")]),v._v(" "),_("h2",{attrs:{id:"常用正则表达式"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#常用正则表达式"}},[v._v("#")]),v._v(" 常用正则表达式")]),v._v(" "),_("p",[v._v("用户名")]),v._v(" "),_("p",[v._v("/^[a-z0-9_-]{3,16}$/")]),v._v(" "),_("p",[v._v("密码")]),v._v(" "),_("p",[v._v("/^[a-z0-9_-]{6,18}$/")]),v._v(" "),_("p",[v._v("十六进制值")]),v._v(" "),_("p",[v._v("/^#?([a-f0-9]{6}|[a-f0-9]{3})$/")]),v._v(" "),_("p",[v._v("电子邮箱")]),v._v(" "),_("p",[v._v("/^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$/"),_("br"),v._v("\n/^[a-z\\d]+(\\.[a-z\\d]+)*@([\\da-z](-[\\da-z])?)+(\\.{1,2}[a-z]+)+$/")]),v._v(" "),_("p",[v._v("URL")]),v._v(" "),_("p",[v._v("/^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$/")]),v._v(" "),_("p",[v._v("IP 地址")]),v._v(" "),_("p",[v._v("/((2[0-4]\\d|25[0-5]|[01]?\\d\\d?)\\.){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)/"),_("br"),v._v("\n/^(?😦?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/")]),v._v(" "),_("p",[v._v("HTML 标签")]),v._v(" "),_("p",[v._v("/^<([a-z]+)([^<]+)*(?:>(.*)<\\/\\1>|\\s+\\/>)$/")]),v._v(" "),_("p",[v._v("删除代码\\\\注释")]),v._v(" "),_("p",[v._v("(?")]),v._v(" "),_("p",[v._v("Unicode编码中的汉字范围")]),v._v(" "),_("p",[v._v("/^[\\u2E80-\\u9FFF]+$/")])])}),[],!1,null,null,null);_.default=e.exports}}]);