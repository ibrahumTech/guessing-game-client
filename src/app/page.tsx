import styles from './page.module.css'
import Layout from '../layouts'
import {GameContexProvider} from "@/context/game";


export default function Home() {
  return (
    <main className={styles.main}>
      <GameContexProvider>
        <Layout />
      </GameContexProvider>
    </main>
  )
}
