import { useDispatch, useSelector } from "react-redux";
import { STATUS, actions } from "../features/randomFact";

const RandomFact = () => {
  const factObject = useSelector(state => state.randomFact);

  const dispatch = useDispatch();

  let content = null;
  
  if (factObject.status == STATUS.NORMAL) {
    content = "Ready to fetch fact?";
  } else if (factObject.status == STATUS.FETCHING) {
    content = "Fetching..."
  } else if (factObject.status == STATUS.SUCCESS) {
    content = factObject.fact
  } else if (factObject.status == STATUS.FAILURE) {
    content = "Unable to fetch data"
  }

  return (
    <div>
      <button onClick={() => fetchFact(dispatch)}>Get Fact!</button>
      <p>{content}</p>
    </div>
  );
};

async function fetchFact(dispatch) {
  dispatch(actions.isFetching());

  const URL = "https://uselessfacts.jsph.pl/random.json?language=en";

  try {

    let response = await fetch(URL);
    let json = await response.json();
    let fact = json.text;

    // Added delay to display status
    setTimeout(() => {
      dispatch(actions.success(fact));
    }, 2000);
  } catch {
    dispatch(actions.failure());
  }
}

export default RandomFact;
