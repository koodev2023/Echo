const myIcons: { [key: string]: string } = {
  undo: `<svg viewbox="0 0 18 18">
      <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
      <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
    </svg>`,

  redo: `<svg viewbox="0 0 18 18">
      <polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
      <path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
    </svg>`,

  divider: `<svg viewbox="0 0 18 18">
      <line x1="2" y1="9" x2="16" y2="9" class="ql-stroke" stroke-width="2"></line>
      <circle cx="9" cy="9" r="2" class="ql-fill ql-stroke"></circle>
    </svg>`,
};

export default myIcons;
