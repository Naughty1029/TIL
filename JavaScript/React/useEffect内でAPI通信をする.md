```javascript
import { useEffect, useState } from "react";

const Fetch = () => {
  const [id, setId] = useState("Naughty1029");
  const [name, setName] = useState("Naughty1029");
  const ids = ["Naughty1029", "aws", "google", "facebook"];

  const getRandomId = () => {
    const _id = ids[Math.floor(Math.random() * ids.length)];
    setId(_id);
  };

  useEffect(() => {
    fetch(`https://api.github.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setName(data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <p>
        {id}のGitHub上の名前は{name}です
      </p>
      <button onClick={getRandomId}>idを変更</button>
    </div>
  );
};

export default Fetch;
```
