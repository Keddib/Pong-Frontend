function ElementBar(props) {
  return (
    <div className="group element-bar gap-10">
      <span className="element-bar-line"></span>
      {props.children}
    </div>
  );
}

export default ElementBar;
