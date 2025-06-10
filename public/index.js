window.onload = () => {
  let count1 = 0, count2 = 0, count3 = 0, count4 = 0;

  function updateBars() {
    const total = count1 + count2 + count3 + count4 || 1;

    document.getElementById("bar1").style.width = (count1 / total) * 100 + "%";
    document.getElementById("label1").textContent = `Test1: ${count1}`;

    document.getElementById("bar2").style.width = (count2 / total) * 100 + "%";
    document.getElementById("label2").textContent = `Test2: ${count2}`;

    document.getElementById("bar3").style.width = (count3 / total) * 100 + "%";
    document.getElementById("label3").textContent = `Test3: ${count3}`;

    document.getElementById("bar4").style.width = (count4 / total) * 100 + "%";
    document.getElementById("label4").textContent = `Test4: ${count4}`;
  }

  fetch('/api/votes')
    .then(res => res.json())
    .then(data => {
      count1 = data.test1;
      count2 = data.test2;
      count3 = data.test3;
      count4 = data.test4;
      updateBars();
    });

  ComfyJS.onCommand = (user, command) => {
    const validCommands = ["test1", "test2", "test3", "test4"];
    if (!validCommands.includes(command)) return;

    fetch(`/api/vote/${command}`, {
      method: 'POST'
    })
    .then(res => res.json())
    .then(data => {
      count1 = data.votes.test1;
      count2 = data.votes.test2;
      count3 = data.votes.test3;
      count4 = data.votes.test4;
      updateBars();
    });
  };

  ComfyJS.Init("casthekingofawesomeness", null, ["Castheking02", "Djzandr", "casthekingofawesomeness"]);
};
