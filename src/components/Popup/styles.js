const styles = {
  close: {
    textAlign: 'center',
    marginBottom: 30,
    position: 'absolute',
    top: 8,
    right: 8,
    '& .close-icon': {
      fontSize: 24,
      color: '#424242',
    }
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .large': {
      width: 752
    },
    '& .small': {
      width: 520
    },
    '& .paper': {
      outline: 'none',
      padding: 48,
      borderRadius: 16,
      position: 'relative',
      maxHeight: '86vh',
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        background: '#fff0'
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: 100,
        background: '#e0e0e0'
      },
      '& .title': {
        textAlign: 'center',
        whiteSpace: 'pre-line'
      },
    },
  }
};

export default styles;
