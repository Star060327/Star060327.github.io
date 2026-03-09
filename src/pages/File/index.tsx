import styles from './index.module.scss';
import CommonLayout from '../../components/CommonLayout';
import useScrollRestore from '@/hooks/useScrollRestore';
import { data } from '@/utils/data';
import { useNavigate } from 'react-router-dom';
import { Calendar, Tag, ChevronRight, Newspaper } from 'lucide-react';
import { useMemo } from 'react';
import Typewriter from '@/hooks/useTypewriter.tsx';

// 定义归档数据结构
type ArchiveData = {
  year: string;
  list: typeof data;
};

export default function File() {
  useScrollRestore();
  const navigate = useNavigate();

  // 处理数据，按年份分组
  const archiveList = useMemo(() => {
    const map = new Map<string, typeof data>();

    // 按时间倒序排序
    const sortedData = [...data].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    sortedData.forEach((item) => {
      const year = item.date.split('-')[0];
      if (!map.has(year)) {
        map.set(year, []);
      }
      map.get(year)?.push(item);
    });

    const result: ArchiveData[] = [];
    map.forEach((list, year) => {
      result.push({ year, list });
    });

    // 年份倒序
    return result.sort((a, b) => Number(b.year) - Number(a.year));
  }, []);

  // 计算总文章数
  const totalPosts = data.length;
  // 计算总标签数（去重）
  const totalTags = new Set(data.flatMap((item) => item.tags)).size;

  return (
    <CommonLayout>
      <div className={styles['file-container']}>
        <div className={styles.w}>
          {/* 头部统计区域 */}
          <div className={styles.header}>
            <h1>文章归档</h1>
            <p className={styles.subtitle}>
              <Typewriter text="时间的足迹，成长的见证" />
            </p>

            <div className={styles['stats-container']}>
              <div className={styles['stat-item']}>
                <span className={styles.count}>{totalPosts}</span>
                <span className={styles.label}>
                  <Newspaper style={{ width: 14, height: 14 }} /> 文章总数
                </span>
              </div>
              <div className={styles['stat-item']}>
                <span className={styles.count}>{totalTags}</span>
                <span className={styles.label}>
                  <Tag style={{ width: 14, height: 14 }} /> 标签总数
                </span>
              </div>
            </div>
          </div>

          {/* 时间轴列表 */}
          <div className={styles.timeline}>
            {archiveList.map((group) => (
              <div key={group.year} className={styles['year-group']}>
                <div className={styles['year-title']}>{group.year}</div>
                <div className={styles['article-list']}>
                  {group.list.map((item) => (
                    <div key={item.id} className={styles['article-item']}>
                      <div className={styles['article-card']} onClick={() => navigate(item.path)}>
                        <div className={styles.info}>
                          <div className={styles.title}>{item.title}</div>
                          <div className={styles.meta}>
                            <span className={styles.date}>
                              <Calendar style={{ width: 16, height: 16 }} />
                              {item.date}
                            </span>
                            <span className={styles.tag}>
                              <Tag style={{ width: 16, height: 16 }} /> {item.tags.join(', ')}
                            </span>
                          </div>
                        </div>
                        <div className={styles.arrow}>
                          <ChevronRight style={{ width: 20, height: 20 }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
