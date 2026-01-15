export interface NavigateData {
  id: number;
  title: string;
  path: string;
}

const navigateData: NavigateData[] = [
  {
    id: 0,
    title: '首页',
    path: '/'
  },
  {
    id: 1,
    title: '关于我',
    path: '/about'
  },
  {
    id: 0,
    title: '归档',
    path: '/file'
  }
];
export default navigateData;
