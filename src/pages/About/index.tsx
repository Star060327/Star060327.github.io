import styles from './index.module.scss';
import CommonLayout from '../../components/CommonLayout';
export default function About() {
  return (
    <>
      <CommonLayout>
        <div className={styles.about}>关于</div>
      </CommonLayout>
    </>
  );
}
