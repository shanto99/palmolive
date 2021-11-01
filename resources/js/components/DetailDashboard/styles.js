const styles = theme = ({
    rootContainer: {
        minWidth: '100%',
        fontSize: '13px',
        overflow: 'auto'
    },
    reportContainer: {
      width: '1900px'
    },
    reportRow: {
        width: '100%',
        display: 'flex'
    },
    reportCell: {
        flex: 1,
        flexBasis: '100px',
        padding: '5px 10px',
        color: 'black',
        textAlign: 'right'
    },
    reportHead: {
        fontWeight: 'bold',
        backgroundColor: 'rgb(222, 226, 230)',
        color: 'black'
    },
    reportHeadTitleCell: {
        flexBasis: '300px',
        textAlign: 'left !important'
    }
});

export default styles;
