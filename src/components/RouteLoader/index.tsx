import styles from './index.module.scss';
import React from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
  text?: string;
}

const RouteLoader: React.FC<Props> = ({ text = '页面加载中…' }) => {
  return (
    <div className={styles.container} role="status" aria-live="polite">
      <Loader2 className={styles.spinner} />
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default RouteLoader;

