import { h as l, r as c } from './index-PyI2GaQq.js';
function u() {
  const s = l();
  c.useEffect(() => {
    if (typeof window > 'u') return;
    const t = sessionStorage.getItem('scrollPosition');
    t &&
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(t, 10));
      });
    const e = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };
    function n(r, i) {
      let o = null;
      return function () {
        o ||
          (o = setTimeout(() => {
            (r(), (o = null));
          }, i));
      };
    }
    return (
      window.addEventListener('scroll', n(e, 200)),
      () => {
        window.removeEventListener('scroll', n(e, 200));
      }
    );
  }, [s.pathname]);
}
export { u };
