import "./index.scss";

const Editor = (props) => {
  return (
    <textarea
      id="editor"
      type="text"
      onChange={props.onChange}
      value={props.markdown}
    />
  );
};

const Preview = (props) => {
  return (
    <div
      id="preview"
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, { renderer: renderer }),
      }}
    />
  );
};

const Toolbar = (props) => {
  return (
    <div id="toolbar" className={props.className}>
      <p>Markdown Editor</p>
      <i className={props.icon} onClick={props.onClick} title={props.title} />
    </div>
  );
};

const renderer = new marked.Renderer();

marked.setOptions({
  breaks: true,
});

renderer.link = (href, title, text) => {
  return `<a href='${href}' target='_blank'>${text}` + `</a>`;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
      editorMax: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMax = this.handleEditorMax.bind(this);
  }
  handleChange(event) {
    this.setState({
      markdown: event.target.value,
    });
  }
  handleEditorMax() {
    this.setState({
      editorMax: !this.state.editorMax,
    });
  }
  render() {
    const classes = this.state.editorMax
      ? [
          "fa fa-window-minimize",
          "editor",
          "preview",
          "toolbar",
          "minimize toolbar",
        ]
      : [
          "fa fa-window-maximize",
          "min-editor",
          "max-preview",
          "min-toolbar",
          "maximize toolbar",
        ];
    return (
      <section className="container">
        <div className={classes[1]}>
          <Toolbar
            className={classes[3]}
            icon={classes[0]}
            title={classes[4]}
            onClick={this.handleEditorMax}
          />
          <Editor onChange={this.handleChange} markdown={this.state.markdown} />
        </div>
        <div className={classes[2]}>
          <Preview markdown={this.state.markdown} />
        </div>
      </section>
    );
  }
}

const placeholder = `
  <style>
  img {width: 888px; height: 592px;}
  </style>
  
  # Look at All This Great Stuff
  ## So Much to Share
  
  
  - Find out more by visiting [Wikipedia](https://www.wikipedia.org/).
  - Explore [How Stuff Works](https://www.howstuffworks.com/).
  - But don't forget [Reddit](https://www.reddit.com/) if you want the real news.
  
  
  ## Don't Survive the Winter
  
  Winters are not to be survived, they are to be **relished**.
  
  ![the happiest of dogs](https://i.pinimg.com/originals/08/28/c6/0828c66f7988f4a1e0adf141c0dbbe8c.jpg)
  
  
  >Summer is gone with all its infinite wealth, and still nature is genial to man. Though he no longer bathes in the stream, or reclines on the bank, or plucks berries on the hills, still he beholds the same inaccessible beauty around him.
  *-Henry David Thoreau*
  
  The winter is not to be messed with.  Even if it's sometimes a bit \`~~too~~\` cold.
  
  \`\`\`
  # Who am I Kidding?
  ## It can never be too cold
  ### Reasons
  1. We need winter to freeze all the insects dead.
  1. Snow is and insulator so if there's snow it's not even that cold.
  1. If it was warm all the time I would either melt or dry up.
  1. Snow can burn your eyes but only people make you cry.
  1. Think of the polar bears.
  \`\`\`
  
  ## Don't ~~never~~ forget to tip the waitstaff.
  Always remember to **_never_** forget.
  Even if it's a bad day.
  `;

const domContainer = document.querySelector("#app");
ReactDom.render(App, domContainer);
