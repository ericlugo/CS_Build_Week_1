function GridCell(x, y, resolution) {
  this.state = false;
  this.x = x;
  this.y = y;
  this.resolution = resolution;

  this.getState = () => {
    return this.state;
  };

  this.setState = (state) => {
    this.state = state;
  };

  this.toggleState = () => {
    this.state = !this.state;
  };

  this.display = () => {
    if (this.state) {
      fill(0);
      square(
        this.x * this.resolution,
        this.y * this.resolution,
        this.resolution,
      );
    }
  };
}
