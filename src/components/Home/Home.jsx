import { Container } from "@mui/system";
import { useSelector } from "react-redux";
import styles from "./Home.module.scss";

const Home = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  return (
    <div className={styles.home}>
      <Container maxWidth="md">
        <div className={styles.homeInner}>
          {currentUser ? (
            <h3>Welcome {currentUser.user.name}!</h3>
          ) : (
            <h3>Welcome dear user!</h3>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Home;
