# 场景解决方案
[TOC]

### 滑动屏幕，A元素完全被遮盖执行a回调，A元素未被完全遮盖执行B回调
1. 先尝试`IntersectionObserver`，发现如果滑动缓慢，完全遮盖<=>未完全遮盖，临界值intersectionRatio都是0，无法执行不同回调
2. 采用监听scroll事件实时计算：
```
// 获取A元素左下角坐标
const { left, bottom } = titleRef.current.getBoundingClientRect();
// 获取该坐标最上层元素，实际操作中只用left、bottom会获取到下方相邻元素，所以bottom-1使其在元素内部
const topElt = document.elementFromPoint(left, bottom - 1);
// 相同元素，则未遮盖
if (titleRef.current.isSameNode(topElt)) {
  // 未遮盖
} else {
  // 不同元素，则遮盖
}
