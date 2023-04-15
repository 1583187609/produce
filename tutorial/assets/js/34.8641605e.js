(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{360:function(n,t,r){"use strict";r.r(t);var e=r(15),u=Object(e.a)({},(function(){var n=this,t=n._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[t("h1",{attrs:{id:"_3-遍历"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-遍历"}},[n._v("#")]),n._v(" 3 遍历")]),n._v(" "),t("h1",{attrs:{id:"jquery-遍历"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#jquery-遍历"}},[n._v("#")]),n._v(" jQuery 遍历")]),n._v(" "),t("hr"),n._v(" "),t("h2",{attrs:{id:"什么是遍历"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#什么是遍历"}},[n._v("#")]),n._v(" 什么是遍历？")]),n._v(" "),t("p",[n._v('jQuery 遍历，意为"移动"，用于根据其相对于其他元素的关系来"查找"（或选取）HTML 元素。以某项选择开始，并沿着这个选择移动，直到抵达您期望的元素为止。')]),n._v(" "),t("p",[n._v("下图展示了一个家族树。通过 jQuery 遍历，您能够从被选（当前的）元素开始，轻松地在家族树中向上移动（祖先），向下移动（子孙），水平移动（同胞）。这种移动被称为对 DOM 进行遍历。")]),n._v(" "),t("p",[t("img",{attrs:{src:"https://www.runoob.com/images/img_travtree.png",alt:"jQuery Dimensions"}})]),n._v(" "),t("p",[n._v("图示解析：")]),n._v(" "),t("ul",[t("li",[t("p",[n._v("元素是")]),n._v(" "),t("p",[n._v("的父元素，同时是其中所有内容的祖先。-   元素是-   元素的父元素，同时是")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[n._v('    的子元素\n    \n-   左边的\n-   元素是 的父元素，\n    \n    的子元素，同时是\n    \n    的后代。-   元素是\n    -   的子元素，同时是\n        和\n        \n        的后代。-   两个\n        -   元素是同胞（拥有相同的父元素）。\n        -   右边的\n        -   元素是 **的父元素，\n            \n            的子元素，同时是\n            \n            的后代。-   **元素是右边的**\n            -   **的子元素，同时是\n                \n                和\n                \n                的后代。\n                \n                  \n                \n                ![lamp](https://www.runoob.com/images/lamp.jpg)\n                \n                祖先是父、祖父、曾祖父等等。后代是子、孙、曾孙等等。同胞拥有相同的父。\n                \n                  \n                \n                * * *\n                \n                ## 遍历 DOM\n                \n                jQuery 提供了多种遍历 DOM 的方法。\n                \n                遍历方法中最大的种类是树遍历（tree-traversal）。\n                \n                下一章会讲解如何在 DOM 树中向上、下以及同级移动。\n                \n                # jQuery 遍历 - 祖先\n                \n                * * *\n                \n                祖先是父、祖父或曾祖父等等。\n                \n                通过 jQuery，您能够向上遍历 DOM 树，以查找元素的祖先。\n                \n                * * *\n                \n                ## 向上遍历 DOM 树\n                \n                这些 jQuery 方法很有用，它们用于向上遍历 DOM 树：\n                \n                -   parent()\n                -   parents()\n                -   parentsUntil()\n                \n                * * *\n                \n                ## jQuery parent() 方法\n                \n                parent() 方法返回被选元素的直接父元素。\n                \n                该方法只会向上一级对 DOM 树进行遍历。\n                \n                下面的例子返回每个 元素的直接父元素：\n                \n                ## 实例\n                \n                $(document).ready(function(){ $("span").parent(); });\n                \n                  \n                [尝试一下 »](https://www.runoob.com/try/try.php?filename=tryjquery_parent)\n                \n                  \n                \n                * * *\n                \n                ## jQuery parents() 方法\n                \n                parents() 方法返回被选元素的所有祖先元素，它一路向上直到文档的根元素 ()。\n                \n                下面的例子返回所有 元素的所有祖先：\n                \n                ## 实例\n                \n                $(document).ready(function(){ $("span").parents(); });\n                \n                  \n                [尝试一下 »](https://www.runoob.com/try/try.php?filename=tryjquery_parents)\n                \n                您也可以使用可选参数来过滤对祖先元素的搜索。\n                \n                下面的例子返回所有 元素的所有祖先，并且它是\n                \n                元素：\n                \n                ## 实例\n                \n                $(document).ready(function(){ $("span").parents("ul"); });\n                \n                  \n                [尝试一下 »](https://www.runoob.com/try/try.php?filename=tryjquery_parents2)\n                \n                  \n                \n                * * *\n                \n                ## jQuery parentsUntil() 方法\n                \n                parentsUntil() 方法返回介于两个给定元素之间的所有祖先元素。\n                \n                下面的例子返回介于 与\n                \n                元素之间的所有祖先元素：\n                \n                ## 实例\n                \n                $(document).ready(function(){ $("span").parentsUntil("div"); });\n                \n                  \n                [尝试一下 »](https://www.runoob.com/try/try.php?filename=tryjquery_parentsuntil)\n                \n                # jQuery 遍历 - 后代\n                \n                * * *\n                \n                后代是子、孙、曾孙等等。\n                \n                通过 jQuery，您能够向下遍历 DOM 树，以查找元素的后代。\n                \n                * * *\n                \n                ## 向下遍历 DOM 树\n                \n                下面是两个用于向下遍历 DOM 树的 jQuery 方法：\n                \n                -   children()\n                -   find()\n                \n                * * *\n                \n                ## jQuery children() 方法\n                \n                children() 方法返回被选元素的所有直接子元素。\n                \n                该方法只会向下一级对 DOM 树进行遍历。\n                \n                下面的例子返回每个\n                \n                元素的所有直接子元素：\n                \n                ## 实例\n                \n                $(document).ready(function(){ $("div").children(); });\n                \n                  \n                [尝试一下 »](https://www.runoob.com/try/try.php?filename=tryjquery_children)\n                \n                您也可以使用可选参数来过滤对子元素的搜索。\n                \n                下面的例子返回类名为 "1" 的所有\n                \n                元素，并且它们是\n                \n                的直接子元素：\n                \n                ## 实例\n                \n                $(document).ready(function(){ $("div").children("p.1"); });\n                \n                  \n                [尝试一下 »](https://www.runoob.com/try/try.php?filename=tryjquery_children2)\n                \n                  \n                \n                * * *\n                \n                ## jQuery find() 方法\n                \n                find() 方法返回被选元素的后代元素，一路向下直到最后一个后代。\n                \n                下面的例子返回属于\n                \n                后代的所有 元素：\n                \n                ## 实例\n                \n                $(document).ready(function(){ $("div").find("span"); });\n                \n                  \n                [尝试一下 »](https://www.runoob.com/try/try.php?filename=tryjquery_find)\n                \n                下面的例子返回\n                \n                的所有后代：\n                \n                ## 实例\n                \n                $(document).ready(function(){ $("div").find("\\*"); });\n                \n                  \n                [尝试一下 »](https://www.runoob.com/try/try.php?filename=tryjquery_find2)\n                \n                # jQuery 遍历 - 同胞(siblings)\n                \n                * * *\n                \n                同胞拥有相同的父元素。\n                \n                通过 jQuery，您能够在 DOM 树中遍历元素的同胞元素。\n                \n                * * *\n                \n                ## 在 DOM 树中水平遍历\n                \n                有许多有用的方法让我们在 DOM 树进行水平遍历：\n                \n                -   siblings()\n                -   next()\n                -   nextAll()\n                -   nextUntil()\n                -   prev()\n                -   prevAll()\n                -   prevUntil()\n                \n                * * *\n                \n                ## jQuery siblings() 方法\n                \n                siblings() 方法返回被选元素的所有同胞元素。\n                \n                下面的例子返回\n                \n                ## 的所有同胞元素：\n                \n                ## 实例\n                \n                $(document).ready(function(){ $("h2").siblings(); });\n                \n                  \n                [尝试一下 »](https://www.runoob.com/try/try.php?filename=tryjquery_siblings)\n                \n                您也可以使用可选参数来过滤对同胞元素的搜索。\n                \n                下面的例子返回属于\n                \n                ## 的同胞元素的所有\n                \n                元素：\n                \n                ## 实例\n                \n                $(document).ready(function(){ $("h2").siblings("p"); });\n                \n                  \n                [尝试一下 »](https://www.runoob.com/try/try.php?filename=tryjquery_siblings2)\n                \n                  \n                \n                * * *\n                \n                ## jQuery next() 方法\n                \n                next() 方法返回被选元素的下一个同胞元素。\n                \n                该方法只返回一个元素。\n                \n                下面的例子返回\n                \n                ## 的下一个同胞元素：\n                \n                ## 实例\n                \n                $(document).ready(function(){ $("h2").next(); });\n                \n                  \n                [尝试一下 »](https://www.runoob.com/try/try.php?filename=tryjquery_next)\n                \n                  \n                \n                * * *\n                \n                ## jQuery nextAll() 方法\n                \n                nextAll() 方法返回被选元素的所有跟随的同胞元素。\n                \n                下面的例子返回\n                \n                ## 的所有跟随的同胞元素：\n                \n                ## 实例\n                \n                $(document).ready(function(){ $("h2").nextAll(); });\n                \n                  \n                [尝试一下 »](https://www.runoob.com/try/try.php?filename=tryjquery_nextall)\n                \n                  \n                \n                * * *\n                \n                ## jQuery nextUntil() 方法\n                \n                nextUntil() 方法返回介于两个给定参数之间的所有跟随的同胞元素。\n                \n                下面的例子返回介于\n                \n                ## 与\n                \n                ###### 元素之间的所有同胞元素：\n                \n                ## 实例\n                \n                $(document).ready(function(){ $("h2").nextUntil("h6"); });\n                \n                  \n                [尝试一下 »](https://www.runoob.com/try/try.php?filename=tryjquery_nextuntil)\n                \n                  \n                \n                * * *\n                \n                ## jQuery prev(), prevAll() & prevUntil() 方法\n                \n                prev(), prevAll() 以及 prevUntil() 方法的工作方式与上面的方法类似，只不过方向相反而已：它们返回的是前面的同胞元素（在 DOM 树中沿着同胞之前元素遍历，而不是之后元素遍历）。\n                \n                # jQuery 遍历- 过滤\n                \n                * * *\n                \n                ## 缩小搜索元素的范围\n                \n                三个最基本的过滤方法是：first(), last() 和 eq()，它们允许您基于其在一组元素中的位置来选择一个特定的元素。\n                \n                其他过滤方法，比如 filter() 和 not() 允许您选取匹配或不匹配某项指定标准的元素。\n                \n                * * *\n                \n                ## jQuery first() 方法\n                \n                first() 方法返回被选元素的首个元素。\n                \n                下面的例子选取首个\n                \n                元素内部的第一个\n                \n                元素：\n                \n                ## 实例\n                \n                $(document).ready(function(){ $("div p").first(); });\n                \n                  \n                [尝试一下 »](https://www.runoob.com/try/try.php?filename=tryjquery_first)\n                \n                  \n                \n                * * *\n                \n                ## jQuery last() 方法\n                \n                last() 方法返回被选元素的最后一个元素。\n                \n                下面的例子选择最后一个\n                \n                元素中的最后一个\n                \n                元素：\n                \n                ## 实例\n                \n                $(document).ready(function(){ $("div p").last(); });\n                \n                  \n                [尝试一下 »](https://www.runoob.com/try/try.php?filename=tryjquery_last)\n                \n                  \n                \n                * * *\n                \n                ## jQuery eq() 方法\n                \n                eq() 方法返回被选元素中带有指定索引号的元素。\n                \n                索引号从 0 开始，因此首个元素的索引号是 0 而不是 1。下面的例子选取第二个\n                \n                元素（索引号 1）：\n                \n                ## 实例\n                \n                $(document).ready(function(){ $("p").eq(1); });\n                \n                  \n                [尝试一下 »](https://www.runoob.com/try/try.php?filename=tryjquery_eq)\n                \n                  \n                \n                * * *\n                \n                ## jQuery filter() 方法\n                \n                filter() 方法允许您规定一个标准。不匹配这个标准的元素会被从集合中删除，匹配的元素会被返回。\n                \n                下面的例子返回带有类名 "url" 的所有\n                \n                元素：\n                \n                ## 实例\n                \n                $(document).ready(function(){ $("p").filter(".url"); });\n                \n                  \n                [尝试一下 »](https://www.runoob.com/try/try.php?filename=tryjquery_filter)\n                \n                  \n                \n                * * *\n                \n                ## jQuery not() 方法\n                \n                not() 方法返回不匹配标准的所有元素。\n                \n                提示：not() 方法与 filter() 相反。\n                \n                下面的例子返回不带有类名 "url" 的所有\n                \n                元素：\n                \n                ## 实例\n                \n                $(document).ready(function(){ $("p").not(".url"); });\n                \n                  \n                [尝试一下 »](https://www.runoob.com/try/try.php?filename=tryjquery_not)\n                \n                \n                \n                \n                \n                \n                \n                \n                \n                \n                \n                \n                \n                \n                \n                \n                \n                **\n            \n            \n            \n            **')])])])])])])}),[],!1,null,null,null);t.default=u.exports}}]);