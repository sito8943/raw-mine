// texts
import texts from "../../lang/texts.json";

const Welcome = (props) => {
  const { start, lang } = props;

  return (
    <div>
      <div className="home-form">
        <h1>{texts[lang].welcome.title}</h1>
        <button onClick={start}>{texts[lang].welcome.submit}</button>
      </div>
    </div>
  );
};

export default Welcome;
