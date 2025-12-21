import { useEffect } from 'react';

export default function useScrollRestore() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    //1.恢复位置
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      // 延迟执行，确保内容加载完成
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(savedPosition, 10));
      });
    }
    const handleScroll = () => {
      //2.记录位置
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };
    // 节流优化
    function throttle(fn: () => void, t: number) {
      let timer: null | number = null;
      return function () {
        if (!timer) {
          timer = setTimeout(() => {
            fn();
            timer = null;
          }, t);
        }
      };
    }
    //3.监听滚动事件
    window.addEventListener('scroll', throttle(handleScroll, 200));
    return () => {
      //4.组件卸载时移除事件监听
      window.removeEventListener('scroll', throttle(handleScroll, 200));
    };
  }, []);
}
