(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{348:function(t,e,a){"use strict";a.r(e);var r=a(15),i=Object(r.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"_1-起步"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-起步"}},[t._v("#")]),t._v(" 1 起步")]),t._v(" "),e("h2",{attrs:{id:"_1-1-起步-关于版本控制"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-起步-关于版本控制"}},[t._v("#")]),t._v(" 1.1 起步 - 关于版本控制")]),t._v(" "),e("p",[t._v("本章为 Git 入门。 我们从介绍版本控制工具的背景知识开始，然后讲解如何在你的系统上运行 Git，最后是关于如何设置 Git 以便开始工作。 通过本章的学习，你应该能了解为什么 Git 这么流行，为什么你应该使用 Git 以及你应该如何设置以便使用 Git。")]),t._v(" "),e("h3",{attrs:{id:"关于版本控制"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#关于版本控制"}},[t._v("#")]),t._v(" 关于版本控制")]),t._v(" "),e("p",[t._v("什么是“版本控制”？我为什么要关心它呢？ 版本控制是一种记录一个或若干文件内容变化，以便将来查阅特定版本修订情况的系统。 在本书所展示的例子中，我们对保存着软件源代码的文件作版本控制，但实际上，你可以对任何类型的文件进行版本控制。")]),t._v(" "),e("p",[t._v("如果你是位图形或网页设计师，可能会需要保存某一幅图片或页面布局文件的所有修订版本（这或许是你非常渴望拥有的功能），采用版本控制系统（VCS）是个明智的选择。 有了它你就可以将选定的文件回溯到之前的状态，甚至将整个项目都回退到过去某个时间点的状态，你可以比较文件的变化细节，查出最后是谁修改了哪个地方，从而找出导致怪异问题出现的原因，又是谁在何时报告了某个功能缺陷等等。 使用版本控制系统通常还意味着，就算你乱来一气把整个项目中的文件改的改删的删，你也照样可以轻松恢复到原先的样子。 但额外增加的工作量却微乎其微。")]),t._v(" "),e("h4",{attrs:{id:"本地版本控制系统"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#本地版本控制系统"}},[t._v("#")]),t._v(" 本地版本控制系统")]),t._v(" "),e("p",[t._v("许多人习惯用复制整个项目目录的方式来保存不同的版本，或许还会改名加上备份时间以示区别。 这么做唯一的好处就是简单，但是特别容易犯错。 有时候会混淆所在的工作目录，一不小心会写错文件或者覆盖意想外的文件。")]),t._v(" "),e("p",[t._v("为了解决这个问题，人们很久以前就开发了许多种本地版本控制系统，大多都是采用某种简单的数据库来记录文件的历次更新差异。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://juejin.cn/post/book/en/v2/images/local.png",alt:"本地版本控制图解"}})]),t._v(" "),e("p",[t._v("Figure 1. 本地版本控制.")]),t._v(" "),e("p",[t._v("其中最流行的一种叫做 RCS，现今许多计算机系统上都还看得到它的踪影。 "),e("a",{attrs:{href:"https://www.gnu.org/software/rcs/",target:"_blank",rel:"noopener noreferrer"}},[t._v("RCS"),e("OutboundLink")],1),t._v(" 的工作原理是在硬盘上保存补丁集（补丁是指文件修订前后的变化）；通过应用所有的补丁，可以重新计算出各个版本的文件内容。")]),t._v(" "),e("h4",{attrs:{id:"集中化的版本控制系统"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#集中化的版本控制系统"}},[t._v("#")]),t._v(" 集中化的版本控制系统")]),t._v(" "),e("p",[t._v("接下来人们又遇到一个问题，如何让在不同系统上的开发者协同工作？ 于是，集中化的版本控制系统（Centralized Version Control Systems，简称 CVCS）应运而生。 这类系统，诸如 CVS、Subversion 以及 Perforce 等，都有一个单一的集中管理的服务器，保存所有文件的修订版本，而协同工作的人们都通过客户端连到这台服务器，取出最新的文件或者提交更新。 多年以来，这已成为版本控制系统的标准做法。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://juejin.cn/post/book/en/v2/images/centralized.png",alt:"集中化的版本控制图解"}})]),t._v(" "),e("p",[t._v("Figure 2. 集中化的版本控制.")]),t._v(" "),e("p",[t._v("这种做法带来了许多好处，特别是相较于老式的本地 VCS 来说。 现在，每个人都可以在一定程度上看到项目中的其他人正在做些什么。 而管理员也可以轻松掌控每个开发者的权限，并且管理一个 CVCS 要远比在各个客户端上维护本地数据库来得轻松容易。")]),t._v(" "),e("p",[t._v("事分两面，有好有坏。 这么做最显而易见的缺点是中央服务器的单点故障。 如果宕机一小时，那么在这一小时内，谁都无法提交更新，也就无法协同工作。 如果中心数据库所在的磁盘发生损坏，又没有做恰当备份，毫无疑问你将丢失所有数据——包括项目的整个变更历史，只剩下人们在各自机器上保留的单独快照。 本地版本控制系统也存在类似问题，只要整个项目的历史记录被保存在单一位置，就有丢失所有历史更新记录的风险。")]),t._v(" "),e("h4",{attrs:{id:"分布式版本控制系统"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#分布式版本控制系统"}},[t._v("#")]),t._v(" 分布式版本控制系统")]),t._v(" "),e("p",[t._v("于是分布式版本控制系统（Distributed Version Control System，简称 DVCS）面世了。 在这类系统中，像 Git、Mercurial、Bazaar 以及 Darcs 等，客户端并不只提取最新版本的文件快照， 而是把代码仓库完整地镜像下来，包括完整的历史记录。 这么一来，任何一处协同工作用的服务器发生故障，事后都可以用任何一个镜像出来的本地仓库恢复。 因为每一次的克隆操作，实际上都是一次对代码仓库的完整备份。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://juejin.cn/post/book/en/v2/images/distributed.png",alt:"分布式版本控制图解"}})]),t._v(" "),e("p",[t._v("Figure 3. 分布式版本控制.")]),t._v(" "),e("p",[t._v("更进一步，许多这类系统都可以指定和若干不同的远端代码仓库进行交互。籍此，你就可以在同一个项目中，分别和不同工作小组的人相互协作。 你可以根据需要设定不同的协作流程，比如层次模型式的工作流，而这在以前的集中式系统中是无法实现的。")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://juejin.cn/post/book",target:"_blank",rel:"noopener noreferrer"}},[t._v("prev"),e("OutboundLink")],1),t._v(" | "),e("a",{attrs:{href:"https://juejin.cn/post/book/zh/v2/%E8%B5%B7%E6%AD%A5-Git-%E7%AE%80%E5%8F%B2",target:"_blank",rel:"noopener noreferrer"}},[t._v("next"),e("OutboundLink")],1)]),t._v(" "),e("h2",{attrs:{id:"_1-2-起步-git-简史"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-起步-git-简史"}},[t._v("#")]),t._v(" 1.2 起步 - Git 简史")]),t._v(" "),e("h3",{attrs:{id:"git-简史"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git-简史"}},[t._v("#")]),t._v(" Git 简史")]),t._v(" "),e("p",[t._v("同生活中的许多伟大事物一样，Git 诞生于一个极富纷争大举创新的年代。")]),t._v(" "),e("p",[t._v("Linux 内核开源项目有着为数众多的参与者。 绝大多数的 Linux 内核维护工作都花在了提交补丁和保存归档的繁琐事务上（1991－2002年间）。 到 2002 年，整个项目组开始启用一个专有的分布式版本控制系统 BitKeeper 来管理和维护代码。")]),t._v(" "),e("p",[t._v("到了 2005 年，开发 BitKeeper 的商业公司同 Linux 内核开源社区的合作关系结束，他们收回了 Linux 内核社区免费使用 BitKeeper 的权力。 这就迫使 Linux 开源社区（特别是 Linux 的缔造者 Linus Torvalds）基于使用 BitKeeper 时的经验教训，开发出自己的版本系统。 他们对新的系统制订了若干目标：")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("速度")])]),t._v(" "),e("li",[e("p",[t._v("简单的设计")])]),t._v(" "),e("li",[e("p",[t._v("对非线性开发模式的强力支持（允许成千上万个并行开发的分支）")])]),t._v(" "),e("li",[e("p",[t._v("完全分布式")])]),t._v(" "),e("li",[e("p",[t._v("有能力高效管理类似 Linux 内核一样的超大规模项目（速度和数据量）")])])]),t._v(" "),e("p",[t._v("自诞生于 2005 年以来，Git 日臻成熟完善，在高度易用的同时，仍然保留着初期设定的目标。 它的速度飞快，极其适合管理大项目，有着令人难以置信的非线性分支管理系统（参见 "),e("a",{attrs:{href:"ch00/ch03-git-branching"}},[t._v("Git 分支")]),t._v("）。")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://juejin.cn/post/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%85%B3%E4%BA%8E%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6",target:"_blank",rel:"noopener noreferrer"}},[t._v("prev"),e("OutboundLink")],1),t._v(" | "),e("a",{attrs:{href:"https://juejin.cn/post/book/zh/v2/%E8%B5%B7%E6%AD%A5-Git-%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F",target:"_blank",rel:"noopener noreferrer"}},[t._v("next"),e("OutboundLink")],1)]),t._v(" "),e("h2",{attrs:{id:"_1-3-起步-git-是什么"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-起步-git-是什么"}},[t._v("#")]),t._v(" 1.3 起步 - Git 是什么？")]),t._v(" "),e("h3",{attrs:{id:"git-是什么"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git-是什么"}},[t._v("#")]),t._v(" Git 是什么？")]),t._v(" "),e("p",[t._v("那么，简单地说，Git 究竟是怎样的一个系统呢？ 请注意接下来的内容非常重要，若你理解了 Git 的思想和基本工作原理，用起来就会知其所以然，游刃有余。 在学习 Git 时，请尽量理清你对其它版本管理系统已有的认识，如 CVS、Subversion 或 Perforce， 这样能帮助你使用工具时避免发生混淆。尽管 Git 用起来与其它的版本控制系统非常相似， 但它在对信息的存储和认知方式上却有很大差异，理解这些差异将有助于避免使用中的困惑。")]),t._v(" "),e("h4",{attrs:{id:"直接记录快照-而非差异比较"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#直接记录快照-而非差异比较"}},[t._v("#")]),t._v(" 直接记录快照，而非差异比较")]),t._v(" "),e("p",[t._v("Git 和其它版本控制系统（包括 Subversion 和近似工具）的主要差别在于 Git 对待数据的方式。 从概念上来说，其它大部分系统以文件变更列表的方式存储信息，这类系统（CVS、Subversion、Perforce、Bazaar 等等） 将它们存储的信息看作是一组基本文件和每个文件随时间逐步累积的差异 （它们通常称作 "),e("strong",[t._v("基于差异（delta-based）")]),t._v(" 的版本控制）。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://juejin.cn/post/book/en/v2/images/deltas.png",alt:"存储每个文件与初始版本的差异。"}})]),t._v(" "),e("p",[t._v("Figure 4. 存储每个文件与初始版本的差异.")]),t._v(" "),e("p",[t._v("Git 不按照以上方式对待或保存数据。反之，Git 更像是把数据看作是对小型文件系统的一系列快照。 在 Git 中，每当你提交更新或保存项目状态时，它基本上就会对当时的全部文件创建一个快照并保存这个快照的索引。 为了效率，如果文件没有修改，Git 不再重新存储该文件，而是只保留一个链接指向之前存储的文件。 Git 对待数据更像是一个 "),e("strong",[t._v("快照流")]),t._v("。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://juejin.cn/post/book/en/v2/images/snapshots.png",alt:"Git 存储项目随时间改变的快照。"}})]),t._v(" "),e("p",[t._v("Figure 5. 存储项目随时间改变的快照.")]),t._v(" "),e("p",[t._v("这是 Git 与几乎所有其它版本控制系统的重要区别。 因此 Git 重新考虑了以前每一代版本控制系统延续下来的诸多方面。 Git 更像是一个小型的文件系统，提供了许多以此为基础构建的超强工具，而不只是一个简单的 VCS。 稍后我们在"),e("a",{attrs:{href:"ch00/ch03-git-branching"}},[t._v("Git 分支")]),t._v("讨论 Git 分支管理时，将探究这种方式对待数据所能获得的益处。")]),t._v(" "),e("h4",{attrs:{id:"近乎所有操作都是本地执行"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#近乎所有操作都是本地执行"}},[t._v("#")]),t._v(" 近乎所有操作都是本地执行")]),t._v(" "),e("p",[t._v("在 Git 中的绝大多数操作都只需要访问本地文件和资源，一般不需要来自网络上其它计算机的信息。 如果你习惯于所有操作都有网络延时开销的集中式版本控制系统，Git 在这方面会让你感到速度之神赐给了 Git 超凡的能量。 因为你在本地磁盘上就有项目的完整历史，所以大部分操作看起来瞬间完成。")]),t._v(" "),e("p",[t._v("举个例子，要浏览项目的历史，Git 不需外连到服务器去获取历史，然后再显示出来——它只需直接从本地数据库中读取。 你能立即看到项目历史。如果你想查看当前版本与一个月前的版本之间引入的修改， Git 会查找到一个月前的文件做一次本地的差异计算，而不是由远程服务器处理或从远程服务器拉回旧版本文件再来本地处理。")]),t._v(" "),e("p",[t._v("这也意味着你在离线或者没有 VPN 时，几乎可以进行任何操作。 如你在飞机或火车上想做些工作，就能愉快地提交（到你的 "),e("strong",[t._v("本地")]),t._v(" 副本，还记得吗？）， 直到有网络连接时再上传。如你回家后 VPN 客户端不正常，那么也仍能工作。 使用其它系统的话，做到这些是不可能或很费力的。 比如，用 Perforce 的话，没有连接服务器时几乎不能做什么事；而用 Subversion 和 CVS 的话， 你能修改文件，但不能向数据库提交修改（因为你的本地数据库离线了）。 这样似乎问题不大，但是你可能会惊喜地发现它带来的巨大的不同。")]),t._v(" "),e("h4",{attrs:{id:"git-保证完整性"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git-保证完整性"}},[t._v("#")]),t._v(" Git 保证完整性")]),t._v(" "),e("p",[t._v("Git 中所有的数据在存储前都计算校验和，然后以校验和来引用。 这意味着不可能在 Git 不知情时更改任何文件内容或目录内容。 这个功能建构在 Git 底层，是构成 Git 哲学不可或缺的部分。 若你在传送过程中丢失信息或损坏文件，Git 就能发现。")]),t._v(" "),e("p",[t._v("Git 用以计算校验和的机制叫做 SHA-1 散列（hash，哈希）。 这是一个由 40 个十六进制字符（0-9 和 a-f）组成的字符串，基于 Git 中文件的内容或目录结构计算出来。 SHA-1 哈希看起来是这样：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("24b9da6552252987aa493b52f8696cd6d3b00373\n")])])]),e("p",[t._v("Git 中使用这种哈希值的情况很多，你将经常看到这种哈希值。 实际上，Git 数据库中保存的信息都是以文件内容的哈希值来索引，而不是文件名。")]),t._v(" "),e("h4",{attrs:{id:"git-一般只添加数据"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git-一般只添加数据"}},[t._v("#")]),t._v(" Git 一般只添加数据")]),t._v(" "),e("p",[t._v("你执行的 Git 操作，几乎只往 Git 数据库中 "),e("strong",[t._v("添加")]),t._v(" 数据。 你很难使用 Git 从数据库中删除数据，也就是说 Git 几乎不会执行任何可能导致文件不可恢复的操作。 同别的 VCS 一样，未提交更新时有可能丢失或弄乱修改的内容。但是一旦你提交快照到 Git 中， 就难以再丢失数据，特别是如果你定期的推送数据库到其它仓库的话。")]),t._v(" "),e("p",[t._v("这使得我们使用 Git 成为一个安心愉悦的过程，因为我们深知可以尽情做各种尝试，而没有把事情弄糟的危险。 更深度探讨 Git 如何保存数据及恢复丢失数据的话题，请参考"),e("a",{attrs:{href:"ch00/_undoing"}},[t._v("撤消操作")]),t._v("。")]),t._v(" "),e("h4",{attrs:{id:"三种状态"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#三种状态"}},[t._v("#")]),t._v(" 三种状态")]),t._v(" "),e("p",[t._v("现在请注意，如果你希望后面的学习更顺利，请记住下面这些关于 Git 的概念。 Git 有三种状态，你的文件可能处于其中之一： "),e("strong",[t._v("已提交（committed）")]),t._v("、"),e("strong",[t._v("已修改（modified）")]),t._v(" 和 "),e("strong",[t._v("已暂存（staged）")]),t._v("。")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("已修改表示修改了文件，但还没保存到数据库中。")])]),t._v(" "),e("li",[e("p",[t._v("已暂存表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。")])]),t._v(" "),e("li",[e("p",[t._v("已提交表示数据已经安全地保存在本地数据库中。")])])]),t._v(" "),e("p",[t._v("这会让我们的 Git 项目拥有三个阶段：工作区、暂存区以及 Git 目录。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://juejin.cn/post/book/en/v2/images/areas.png",alt:"工作区、暂存区以及 Git 目录。"}})]),t._v(" "),e("p",[t._v("Figure 6. 工作目录、暂存区域以及 Git 仓库.")]),t._v(" "),e("p",[t._v("工作区是对项目的某个版本独立提取出来的内容。 这些从 Git 仓库的压缩数据库中提取出来的文件，放在磁盘上供你使用或修改。")]),t._v(" "),e("p",[t._v("暂存区是一个文件，保存了下次将要提交的文件列表信息，一般在 Git 仓库目录中。 按照 Git 的术语叫做“索引”，不过一般说法还是叫“暂存区”。")]),t._v(" "),e("p",[t._v("Git 仓库目录是 Git 用来保存项目的元数据和对象数据库的地方。 这是 Git 中最重要的部分，从其它计算机克隆仓库时，复制的就是这里的数据。")]),t._v(" "),e("p",[t._v("基本的 Git 工作流程如下：")]),t._v(" "),e("ol",[e("li",[e("p",[t._v("在工作区中修改文件。")])]),t._v(" "),e("li",[e("p",[t._v("将你想要下次提交的更改选择性地暂存，这样只会将更改的部分添加到暂存区。")])]),t._v(" "),e("li",[e("p",[t._v("提交更新，找到暂存区的文件，将快照永久性存储到 Git 目录。")])])]),t._v(" "),e("p",[t._v("如果 Git 目录中保存着特定版本的文件，就属于 "),e("strong",[t._v("已提交")]),t._v(" 状态。 如果文件已修改并放入暂存区，就属于 "),e("strong",[t._v("已暂存")]),t._v(" 状态。 如果自上次检出后，作了修改但还没有放到暂存区域，就是 "),e("strong",[t._v("已修改")]),t._v(" 状态。 在 "),e("a",{attrs:{href:"ch00/ch02-git-basics-chapter"}},[t._v("Git 基础")]),t._v(" 一章，你会进一步了解这些状态的细节， 并学会如何根据文件状态实施后续操作，以及怎样跳过暂存直接提交。")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://juejin.cn/post/book/zh/v2/%E8%B5%B7%E6%AD%A5-Git-%E7%AE%80%E5%8F%B2",target:"_blank",rel:"noopener noreferrer"}},[t._v("prev"),e("OutboundLink")],1),t._v(" | "),e("a",{attrs:{href:"https://juejin.cn/post/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%91%BD%E4%BB%A4%E8%A1%8C",target:"_blank",rel:"noopener noreferrer"}},[t._v("next"),e("OutboundLink")],1)]),t._v(" "),e("h2",{attrs:{id:"_1-4-起步-命令行"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-起步-命令行"}},[t._v("#")]),t._v(" 1.4 起步 - 命令行")]),t._v(" "),e("h3",{attrs:{id:"命令行"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#命令行"}},[t._v("#")]),t._v(" 命令行")]),t._v(" "),e("p",[t._v("Git 有多种使用方式。 你可以使用原生的命令行模式，也可以使用 GUI 模式，这些 GUI 软件也能提供多种功能。 在本书中，我们将使用命令行模式。 这是因为首先，只有在命令行模式下你才能执行 Git 的 "),e("strong",[t._v("所有")]),t._v(" 命令，而大多数的 GUI 软件只实现了 Git 所有功能的一个子集以降低操作难度。 如果你学会了在命令行下如何操作，那么你在操作 GUI 软件时应该也不会遇到什么困难，但是，反之则不成立。 此外，由于每个人的想法与侧重点不同，不同的人常常会安装不同的 GUI 软件，但 "),e("em",[t._v("所有")]),t._v(" 人一定会有命令行工具。")]),t._v(" "),e("p",[t._v("假如你是 macOS 用户，我们希望你懂得如何使用终端（Terminal）；假如你是 Windows 用户，我们希望你懂得如何使用命令窗口（Command Prompt）或 PowerShell。 如果你尚未掌握以上技能，我们建议你先停下来快速学习一下，本书中的讲述和举例将用到这些技能。")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://juejin.cn/post/book/zh/v2/%E8%B5%B7%E6%AD%A5-Git-%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F",target:"_blank",rel:"noopener noreferrer"}},[t._v("prev"),e("OutboundLink")],1),t._v(" | "),e("a",{attrs:{href:"https://juejin.cn/post/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git",target:"_blank",rel:"noopener noreferrer"}},[t._v("next"),e("OutboundLink")],1)]),t._v(" "),e("h2",{attrs:{id:"_1-5-起步-安装-git"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-起步-安装-git"}},[t._v("#")]),t._v(" 1.5 起步 - 安装 Git")]),t._v(" "),e("h3",{attrs:{id:"安装-git"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装-git"}},[t._v("#")]),t._v(" 安装 Git")]),t._v(" "),e("p",[t._v("在你开始使用 Git 前，需要将它安装在你的计算机上。 即便已经安装，最好将它升级到最新的版本。 你可以通过软件包或者其它安装程序来安装，或者下载源码编译安装。")]),t._v(" "),e("p",[t._v("Note")]),t._v(" "),e("p",[t._v("本书写作时使用的 Git 版本为 "),e("strong",[t._v("2.8.0")]),t._v("。 我们使用的大部分命令仍然可以在很古老的 Git 版本上使用，但也有少部分命令不好用或者在旧版本中的行为有差异。 因为 Git 在保持向后兼容方面表现很好，本书使用的这些命令在 2.8 之后的版本应该有效。")]),t._v(" "),e("h4",{attrs:{id:"在-linux-上安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#在-linux-上安装"}},[t._v("#")]),t._v(" 在 Linux 上安装")]),t._v(" "),e("p",[t._v("如果你想在 Linux 上用二进制安装程序来安装基本的 Git 工具，可以使用发行版包含的基础软件包管理工具来安装。 以 Fedora 为例，如果你在使用它（或与之紧密相关的基于 RPM 的发行版，如 RHEL 或 CentOS），你可以使用 "),e("code",[t._v("dnf")]),t._v("：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ sudo dnf install git-all\n")])])]),e("p",[t._v("如果你在基于 Debian 的发行版上，如 Ubuntu，请使用 "),e("code",[t._v("apt")]),t._v("：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ sudo apt install git-all\n")])])]),e("p",[t._v("要了解更多选择，Git 官方网站上有在各种 Unix 发行版的系统上安装步骤，网址为 "),e("a",{attrs:{href:"https://git-scm.com/download/linux",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://git-scm.com/download/linux"),e("OutboundLink")],1),t._v("。")]),t._v(" "),e("h4",{attrs:{id:"在-macos-上安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#在-macos-上安装"}},[t._v("#")]),t._v(" 在 macOS 上安装")]),t._v(" "),e("p",[t._v("在 Mac 上安装 Git 有多种方式。 最简单的方法是安装 Xcode Command Line Tools。 Mavericks （10.9） 或更高版本的系统中，在 Terminal 里尝试首次运行 'git' 命令即可。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ git --version\n")])])]),e("p",[t._v("如果没有安装过命令行开发者工具，将会提示你安装。")]),t._v(" "),e("p",[t._v("如果你想安装更新的版本，可以使用二进制安装程序。 官方维护的 macOS Git 安装程序可以在 Git 官方网站下载，网址为 "),e("a",{attrs:{href:"https://git-scm.com/download/mac",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://git-scm.com/download/mac"),e("OutboundLink")],1),t._v("。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://juejin.cn/post/book/en/v2/images/git-osx-installer.png",alt:"Git macOS 安装程序。"}})]),t._v(" "),e("p",[t._v("Figure 7. Git macOS Installer.")]),t._v(" "),e("p",[t._v("你也可以将它作为 GitHub for macOS 的一部分来安装。 它们的图形化 Git 工具有一个安装命令行工具的选项。 你可以从 GitHub for macOS 网站下载该工具，网址为 "),e("a",{attrs:{href:"https://mac.github.com",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://mac.github.com"),e("OutboundLink")],1),t._v("。")]),t._v(" "),e("h4",{attrs:{id:"在-windows-上安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#在-windows-上安装"}},[t._v("#")]),t._v(" 在 Windows 上安装")]),t._v(" "),e("p",[t._v("在 Windows 上安装 Git 也有几种安装方法。 官方版本可以在 Git 官方网站下载。 打开 "),e("a",{attrs:{href:"https://git-scm.com/download/win",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://git-scm.com/download/win"),e("OutboundLink")],1),t._v("，下载会自动开始。 要注意这是一个名为 Git for Windows 的项目（也叫做 msysGit），和 Git 是分别独立的项目；更多信息请访问 "),e("a",{attrs:{href:"http://msysgit.github.io/",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://msysgit.github.io/"),e("OutboundLink")],1),t._v("。")]),t._v(" "),e("p",[t._v("要进行自动安装，你可以使用 "),e("a",{attrs:{href:"https://chocolatey.org/packages/git",target:"_blank",rel:"noopener noreferrer"}},[t._v("Git Chocolatey 包"),e("OutboundLink")],1),t._v("。 注意 Chocolatey 包是由社区维护的。")]),t._v(" "),e("p",[t._v("另一个简单的方法是安装 GitHub Desktop。 该安装程序包含图形化和命令行版本的 Git。 它也能支持 Powershell，提供了稳定的凭证缓存和健全的换行设置。 稍后我们会对这方面有更多了解，现在只要一句话就够了，这些都是你所需要的。 你可以在 GitHub for Windows 网站下载，网址为 "),e("a",{attrs:{href:"https://desktop.github.com",target:"_blank",rel:"noopener noreferrer"}},[t._v("GitHub Desktop 网站"),e("OutboundLink")],1),t._v("。")]),t._v(" "),e("h4",{attrs:{id:"从源代码安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#从源代码安装"}},[t._v("#")]),t._v(" 从源代码安装")]),t._v(" "),e("p",[t._v("有人觉得从源码安装 Git 更实用，因为你能得到最新的版本。 二进制安装程序倾向于有一些滞后，当然近几年 Git 已经成熟，这个差异不再显著。")]),t._v(" "),e("p",[t._v("如果你想从源码安装 Git，需要安装 Git 依赖的库：autotools、curl、zlib、openssl、expat 和 libiconv。 如果你的系统上有 "),e("code",[t._v("dnf")]),t._v(" （如 Fedora）或者 "),e("code",[t._v("apt")]),t._v("（如基于 Debian 的系统）， 可以使用对应的命令来安装最少的依赖以便编译并安装 Git 的二进制版：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ sudo dnf install dh-autoreconf curl-devel expat-devel gettext-devel \\\n  openssl-devel perl-devel zlib-devel\n$ sudo apt-get install dh-autoreconf libcurl4-gnutls-dev libexpat1-dev \\\n  gettext libz-dev libssl-dev\n")])])]),e("p",[t._v("为了添加文档的多种格式（doc、html、info），需要以下附加的依赖：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ sudo dnf install asciidoc xmlto docbook2X\n$ sudo apt-get install asciidoc xmlto docbook2x\n")])])]),e("p",[t._v("Note")]),t._v(" "),e("p",[t._v("使用 RHEL 和 RHEL 衍生版，如 CentOS 和 Scientific Linux 的用户需要 "),e("a",{attrs:{href:"https://fedoraproject.org/wiki/EPEL#How_can_I_use_these_extra_packages.3F",target:"_blank",rel:"noopener noreferrer"}},[t._v("开启 EPEL 库"),e("OutboundLink")],1),t._v(" 以便下载 "),e("code",[t._v("docbook2X")]),t._v(" 包。")]),t._v(" "),e("p",[t._v("如果你使用基于 Debian 的发行版（Debian/Ubuntu/Ubuntu-derivatives），你也需要 "),e("code",[t._v("install-info")]),t._v(" 包：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ sudo apt-get install install-info\n")])])]),e("p",[t._v("如果你使用基于 RPM 的发行版（Fedora/RHEL/RHEL衍生版），你还需要 "),e("code",[t._v("getopt")]),t._v(" 包 （它已经在基于 Debian 的发行版中预装了）：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ sudo dnf install getopt\n")])])]),e("p",[t._v("此外，如果你使用 Fedora/RHEL/RHEL衍生版，那么你需要执行以下命令：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ sudo ln -s /usr/bin/db2x_docbook2texi /usr/bin/docbook2x-texi\n")])])]),e("p",[t._v("以此来解决二进制文件名的不同。")]),t._v(" "),e("p",[t._v("当你安装好所有的必要依赖，你可以继续从几个地方来取得最新发布版本的 tar 包。 你可以从 Kernel.org 网站获取，网址为 "),e("a",{attrs:{href:"https://www.kernel.org/pub/software/scm/git",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.kernel.org/pub/software/scm/git"),e("OutboundLink")],1),t._v("， 或从 GitHub 网站上的镜像来获得，网址为 "),e("a",{attrs:{href:"https://github.com/git/git/releases",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/git/git/releases"),e("OutboundLink")],1),t._v("。 通常在 GitHub 上的是最新版本，但 kernel.org 上包含有文件下载签名，如果你想验证下载正确性的话会用到。")]),t._v(" "),e("p",[t._v("接着，编译并安装：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ tar -zxf git-2.8.0.tar.gz\n$ cd git-2.8.0\n$ make configure\n$ ./configure --prefix=/usr\n$ make all doc info\n$ sudo make install install-doc install-html install-info\n")])])]),e("p",[t._v("完成后，你可以使用 Git 来获取 Git 的更新：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ git clone git://git.kernel.org/pub/scm/git/git.git\n")])])]),e("p",[e("a",{attrs:{href:"https://juejin.cn/post/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%91%BD%E4%BB%A4%E8%A1%8C",target:"_blank",rel:"noopener noreferrer"}},[t._v("prev"),e("OutboundLink")],1),t._v(" | "),e("a",{attrs:{href:"https://juejin.cn/post/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%88%9D%E6%AC%A1%E8%BF%90%E8%A1%8C-Git-%E5%89%8D%E7%9A%84%E9%85%8D%E7%BD%AE",target:"_blank",rel:"noopener noreferrer"}},[t._v("next"),e("OutboundLink")],1)]),t._v(" "),e("h2",{attrs:{id:"_1-6-起步-初次运行-git-前的配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-6-起步-初次运行-git-前的配置"}},[t._v("#")]),t._v(" 1.6 起步 - 初次运行 Git 前的配置")]),t._v(" "),e("h3",{attrs:{id:"初次运行-git-前的配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#初次运行-git-前的配置"}},[t._v("#")]),t._v(" 初次运行 Git 前的配置")]),t._v(" "),e("p",[t._v("既然已经在系统上安装了 Git，你会想要做几件事来定制你的 Git 环境。 每台计算机上只需要配置一次，程序升级时会保留配置信息。 你可以在任何时候再次通过运行命令来修改它们。")]),t._v(" "),e("p",[t._v("Git 自带一个 "),e("code",[t._v("git config")]),t._v(" 的工具来帮助设置控制 Git 外观和行为的配置变量。 这些变量存储在三个不同的位置：")]),t._v(" "),e("ol",[e("li",[e("p",[e("code",[t._v("/etc/gitconfig")]),t._v(" 文件: 包含系统上每一个用户及他们仓库的通用配置。 如果在执行 "),e("code",[t._v("git config")]),t._v(" 时带上 "),e("code",[t._v("--system")]),t._v(" 选项，那么它就会读写该文件中的配置变量。 （由于它是系统配置文件，因此你需要管理员或超级用户权限来修改它。）")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("~/.gitconfig")]),t._v(" 或 "),e("code",[t._v("~/.config/git/config")]),t._v(" 文件：只针对当前用户。 你可以传递 "),e("code",[t._v("--global")]),t._v(" 选项让 Git 读写此文件，这会对你系统上 "),e("strong",[t._v("所有")]),t._v(" 的仓库生效。")])]),t._v(" "),e("li",[e("p",[t._v("当前使用仓库的 Git 目录中的 "),e("code",[t._v("config")]),t._v(" 文件（即 "),e("code",[t._v(".git/config")]),t._v("）：针对该仓库。 你可以传递 "),e("code",[t._v("--local")]),t._v(" 选项让 Git 强制读写此文件，虽然默认情况下用的就是它。。 （当然，你需要进入某个 Git 仓库中才能让该选项生效。）")])])]),t._v(" "),e("p",[t._v("每一个级别会覆盖上一级别的配置，所以 "),e("code",[t._v(".git/config")]),t._v(" 的配置变量会覆盖 "),e("code",[t._v("/etc/gitconfig")]),t._v(" 中的配置变量。")]),t._v(" "),e("p",[t._v("在 Windows 系统中，Git 会查找 "),e("code",[t._v("$HOME")]),t._v(" 目录下（一般情况下是 "),e("code",[t._v("C:\\Users\\$USER")]),t._v(" ）的 "),e("code",[t._v(".gitconfig")]),t._v(" 文件。 Git 同样也会寻找 "),e("code",[t._v("/etc/gitconfig")]),t._v(" 文件，但只限于 MSys 的根目录下，即安装 Git 时所选的目标位置。 如果你在 Windows 上使用 Git 2.x 以后的版本，那么还有一个系统级的配置文件，Windows XP 上在 "),e("code",[t._v("C:\\Documents and Settings\\All Users\\Application Data\\Git\\config")]),t._v(" ，Windows Vista 及其以后的版本在 "),e("code",[t._v("C:\\ProgramData\\Git\\config")]),t._v(" 。此文件只能以管理员权限通过 "),e("code",[t._v("git config -f")]),t._v(" 来修改。")]),t._v(" "),e("p",[t._v("你可以通过以下命令查看所有的配置以及它们所在的文件：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ git config --list --show-origin\n")])])]),e("h4",{attrs:{id:"用户信息"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#用户信息"}},[t._v("#")]),t._v(" 用户信息")]),t._v(" "),e("p",[t._v("安装完 Git 之后，要做的第一件事就是设置你的用户名和邮件地址。 这一点很重要，因为每一个 Git 提交都会使用这些信息，它们会写入到你的每一次提交中，不可更改：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('$ git config --global user.name "John Doe"\n$ git config --global user.email johndoe@example.com\n')])])]),e("p",[t._v("再次强调，如果使用了 "),e("code",[t._v("--global")]),t._v(" 选项，那么该命令只需要运行一次，因为之后无论你在该系统上做任何事情， Git 都会使用那些信息。 当你想针对特定项目使用不同的用户名称与邮件地址时，可以在那个项目目录下运行没有 "),e("code",[t._v("--global")]),t._v(" 选项的命令来配置。")]),t._v(" "),e("p",[t._v("很多 GUI 工具都会在第一次运行时帮助你配置这些信息。")]),t._v(" "),e("h4",{attrs:{id:"文本编辑器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#文本编辑器"}},[t._v("#")]),t._v(" 文本编辑器")]),t._v(" "),e("p",[t._v("既然用户信息已经设置完毕，你可以配置默认文本编辑器了，当 Git 需要你输入信息时会调用它。 如果未配置，Git 会使用操作系统默认的文本编辑器。")]),t._v(" "),e("p",[t._v("如果你想使用不同的文本编辑器，例如 Emacs，可以这样做：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ git config --global core.editor emacs\n")])])]),e("p",[t._v("在 Windows 系统上，如果你想要使用别的文本编辑器，那么必须指定可执行文件的完整路径。 它可能随你的编辑器的打包方式而不同。")]),t._v(" "),e("p",[t._v("对于 Notepad++，一个流行的代码编辑器来说，你可能想要使用 32 位的版本， 因为在本书编写时 64 位的版本尚不支持所有的插件。 如果你在使用 32 位的 Windows 系统，或在 64 位系统上使用 64 位的编辑器，那么你需要输入如下命令：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ git config --global core.editor \"'C:/Program Files/Notepad++/notepad++.exe' -multiInst -notabbar -nosession -noPlugin\"\n")])])]),e("p",[t._v("Note")]),t._v(" "),e("p",[t._v("Vim、Emacs 和 Notepad++ 都是流行的文本编辑器，通常程序员们会在 Linux 和 macOS 这类基于 Unix 的系统或 Windows 系统上使用它们。 如果你在使用其他的或 32 位版本的编辑器，请在 "),e("a",{attrs:{href:"ch00/ch_core_editor"}},[t._v("git config core.editor 命令")]),t._v(" 中查看设置为该编辑器的具体步骤。")]),t._v(" "),e("p",[t._v("Warning")]),t._v(" "),e("p",[t._v("如果你不这样设置编辑器，那么当 Git 试图启动它时你可能会被弄糊涂、不知所措。 例如，在 Windows 上 Git 在开始编辑时可能会过早地结束。")]),t._v(" "),e("h4",{attrs:{id:"检查配置信息"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#检查配置信息"}},[t._v("#")]),t._v(" 检查配置信息")]),t._v(" "),e("p",[t._v("如果想要检查你的配置，可以使用 "),e("code",[t._v("git config --list")]),t._v(" 命令来列出所有 Git 当时能找到的配置。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ git config --list\nuser.name=John Doe\nuser.email=johndoe@example.com\ncolor.status=auto\ncolor.branch=auto\ncolor.interactive=auto\ncolor.diff=auto\n...\n")])])]),e("p",[t._v("你可能会看到重复的变量名，因为 Git 会从不同的文件中读取同一个配置（例如："),e("code",[t._v("/etc/gitconfig")]),t._v(" 与 "),e("code",[t._v("~/.gitconfig")]),t._v("）。 这种情况下，Git 会使用它找到的每一个变量的最后一个配置。")]),t._v(" "),e("p",[t._v("你可以通过输入 "),e("code",[t._v("git config")]),t._v(" ： 来检查 Git 的某一项配置")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ git config user.name\nJohn Doe\n")])])]),e("p",[t._v("Note")]),t._v(" "),e("p",[t._v("由于 Git 会从多个文件中读取同一配置变量的不同值，因此你可能会在其中看到意料之外的值而不知道为什么。 此时，你可以查询 Git 中该变量的 "),e("strong",[t._v("原始")]),t._v(" 值，它会告诉你哪一个配置文件最后设置了该值：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ git config --show-origin rerere.autoUpdate\nfile:/home/johndoe/.gitconfig\tfalse\n")])])]),e("p",[e("a",{attrs:{href:"https://juejin.cn/post/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git",target:"_blank",rel:"noopener noreferrer"}},[t._v("prev"),e("OutboundLink")],1),t._v(" | "),e("a",{attrs:{href:"https://juejin.cn/post/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E8%8E%B7%E5%8F%96%E5%B8%AE%E5%8A%A9",target:"_blank",rel:"noopener noreferrer"}},[t._v("next"),e("OutboundLink")],1)]),t._v(" "),e("h2",{attrs:{id:"_1-7-起步-获取帮助"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-7-起步-获取帮助"}},[t._v("#")]),t._v(" 1.7 起步 - 获取帮助")]),t._v(" "),e("h3",{attrs:{id:"获取帮助"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#获取帮助"}},[t._v("#")]),t._v(" 获取帮助")]),t._v(" "),e("p",[t._v("若你使用 Git 时需要获取帮助，有三种等价的方法可以找到 Git 命令的综合手册（manpage）：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ git help \n$ git  --help\n$ man git-\n")])])]),e("p",[t._v("例如，要想获得 "),e("code",[t._v("git config")]),t._v(" 命令的手册，执行")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ git help config\n")])])]),e("p",[t._v("这些命令很棒，因为你随时随地可以使用而无需联网。 如果你觉得手册或者本书的内容还不够用，你可以尝试在 Freenode IRC 服务器 "),e("a",{attrs:{href:"https://freenode.net",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://freenode.net"),e("OutboundLink")],1),t._v(" 上的 "),e("code",[t._v("#git")]),t._v(" 或 "),e("code",[t._v("#github")]),t._v(" 频道寻求帮助。 这些频道经常有上百人在线，他们都精通 Git 并且乐于助人。")]),t._v(" "),e("p",[t._v("此外，如果你不需要全面的手册，只需要可用选项的快速参考，那么可以用 "),e("code",[t._v("-h")]),t._v(" 选项获得更简明的 ``help'' 输出：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ git add -h\nusage: git add [] [--] ...\n\n    -n, --dry-run         dry run\n    -v, --verbose         be verbose\n\n    -i, --interactive     interactive picking\n    -p, --patch           select hunks interactively\n    -e, --edit            edit current diff and apply\n    -f, --force           allow adding otherwise ignored files\n    -u, --update          update tracked files\n    --renormalize         renormalize EOL of tracked files (implies -u)\n    -N, --intent-to-add   record only the fact that the path will be added later\n    -A, --all             add changes from all tracked and untracked files\n    --ignore-removal      ignore paths removed in the working tree (same as --no-all)\n    --refresh             don't add, only refresh the index\n    --ignore-errors       just skip files which cannot be added because of errors\n    --ignore-missing      check if - even missing - files are ignored in dry run\n    --chmod (+|-)x        override the executable bit of the listed files\n")])])]),e("p",[e("a",{attrs:{href:"https://juejin.cn/post/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%88%9D%E6%AC%A1%E8%BF%90%E8%A1%8C-Git-%E5%89%8D%E7%9A%84%E9%85%8D%E7%BD%AE",target:"_blank",rel:"noopener noreferrer"}},[t._v("prev"),e("OutboundLink")],1),t._v(" | "),e("a",{attrs:{href:"https://juejin.cn/post/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E6%80%BB%E7%BB%93",target:"_blank",rel:"noopener noreferrer"}},[t._v("next"),e("OutboundLink")],1)]),t._v(" "),e("h2",{attrs:{id:"_1-8-起步-总结"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-8-起步-总结"}},[t._v("#")]),t._v(" 1.8 起步 - 总结")]),t._v(" "),e("h3",{attrs:{id:"总结"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),e("p",[t._v("你应该已经对 Git 是什么、Git 与你可能正在使用的集中式版本控制系统有何区别等问题有了基本的了解。 现在，在你的系统中应该也有了一份能够工作的 Git 版本。 是时候开始学习有关 Git 的基础知识了。")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://juejin.cn/post/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E8%8E%B7%E5%8F%96%E5%B8%AE%E5%8A%A9",target:"_blank",rel:"noopener noreferrer"}},[t._v("prev"),e("OutboundLink")],1),t._v(" | "),e("a",{attrs:{href:"https://juejin.cn/post/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%8E%B7%E5%8F%96-Git-%E4%BB%93%E5%BA%93",target:"_blank",rel:"noopener noreferrer"}},[t._v("next"),e("OutboundLink")],1)])])}),[],!1,null,null,null);e.default=i.exports}}]);