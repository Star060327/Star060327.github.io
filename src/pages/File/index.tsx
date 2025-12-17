import styles from './index.module.scss';
import CommonLayout from '../../components/CommonLayout';
export default function File() {
  return (
    <>
      <CommonLayout>
        <div className={styles.file}>文件</div>
      </CommonLayout>
    </>
  );
}
