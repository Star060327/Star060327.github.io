import {data} from './data';
import classifyData from './classifyData';
type AboutData = {
  id: number;
  count: number;
  content: string;
}
const aboutData: AboutData[] = [
  {
    id: 0,
    count: data.length,
    content: '归档',
  },
  {
    id: 1,
    count: classifyData.length,
    content: '分类',
  },
  {
    id: 2,
    count: 0,
    content: '标签',
  }
]
export default aboutData;
