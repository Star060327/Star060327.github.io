import styles from './index.module.scss';
import CommonLayout from '../../components/CommonLayout';
import useScrollRestore from '@/hooks/useScrollRestore';
export default function File() {
  useScrollRestore();
  return (
    <>
      <CommonLayout>
        <div className={styles.file}>文件</div>
      </CommonLayout>
    </>
  );
}
