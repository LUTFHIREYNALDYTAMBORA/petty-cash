const styles = {
  table: {
    maxHeight: '500px',
    overflow: 'auto',
    border: '1px solid #DEE3ED',
    '& thead': {
      backgroundColor: '#DEE3ED',
      '& .title': {
        width: '65%',
      },
    },
    pagination: {
      display: 'flex',
      padding: 0,
      '& ul': {
        flexWrap: 'nowrap',
        '& .MuiPaginationItem-textSecondary.Mui-selected': {
          color: '#000',
          backgroundColor: 'transparent',
          fontWeight: 'bold'
        },
        '& .MuiPaginationItem-root': {
          color: '#0b59ce',
        }
      },
    },
    '& tfoot': {
      '& .MuiTableCell-footer': {
        color: 'black',
        fontSize: 16,
      },
    },
    '& .action': {
      '& .MuiButton-root': {
        minWidth: 0,
      },
      '& .MuiButton-outlined': {
        padding: 8,
      },
      '& .btn-delete': {
        marginRight: 8,
      },
      '& .btn-edit': {
        marginRight: 8,
      },
    },
    '& .not-found': {
      textAlign: 'center',
      padding: 130,
      '& .icon': {
        width: 75,
        height: 75,
        color: '#DEE3ED'
      },
      '& .info': {
        color: '#707A89',
        '& h3': {
          fontWeight: 'normal'
        },
        '& p': {
          width: '40%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }
      }
    },
    '& .loading1': { height: 75, marginBottom: 2, borderRadius: '5px 5px 0 0', width: '184%' },
    '& .loading2': { height: 75, marginBottom: 2, borderRadius: '0 0 5px 5px', width: '184%' }
  },
};

export default styles;
