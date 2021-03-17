import React from 'react'
import { forwardRef } from 'react';
import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import MaterialTable from 'material-table'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteRounded from '@material-ui/icons/DeleteRounded';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Refresh from '@material-ui/icons/Refresh';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteRounded {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    Refresh: forwardRef((props, ref) => <Refresh {...props} ref={ref} />)
  };
  const tableRef = React.createRef();
class RepaList extends Component{

    emptyCustomer = {
        owner: '',
        marque: '',
        modele: '',
        year: null,
        immat: '',
        trans: '',
        carb: ''
      };


    constructor(props) {
        super(props);
        //const [item, setItem] = useState([]); //table data
//for error handling
        this.state = {repa: [], item: this.emptyCustomer, col: [
            { title: 'Identifiant', field: 'id', editable: false},
            { title: 'Reparateurs', field: 'repa' },
            { title: 'Catégorie', field: 'cat', lookup: { 'rep': 'Réparateur', 'gar': 'Garage' }, },
            { title: 'Reponsable', field: 'respo' },
            { title: 'Addresse', field: 'add' },
            { title: 'Contact', field: 'tel' },
            { title: 'Capacité', field: 'capa', type: 'numeric' },
            { title: 'Portail', field: 'portail', lookup: { 'oui': 'OUI', 'non': 'NON' }, },
        
        ],isLoading: true};

        this.remove = this.remove.bind(this);
        this.edit= this.edit.bind(this);
        this.add= this.add.bind(this);
      }
    
      async componentDidMount() {
        this.setState({isLoading: true});
    
        fetch('http://localhost:8081/api/reparateurs')
          .then(response => response.json())
          .then(data => this.setState({repa: data, isLoading: false}));
      }
      
   

      async remove(id) {
        await fetch(`http://localhost:8081/api/customer/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          let updatedCustomers = [...this.state.customers].filter(i => i.id !== id);
          this.setState({customers: updatedCustomers});
        });
      }
      async edit(newData) {
        if (newData !== "" || newData !== null ){
          if(newData.id !=="new"){
        await fetch('http://localhost:8081/api/customer', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newData),
        });
      }
 
  }
}

async add(newData) {
  if (newData !== "" || newData !== null ){
  await fetch('http://localhost:8081/api/customer', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newData),
  });
}

}
    



      render() {
        const {repa, isLoading} = this.state;
    
        if (isLoading) {
          return <p>Loading...</p>
        }
        const dt = this.state.repa;

        
    return(<div>
<MaterialTable
tableRef={tableRef}
icons={tableIcons}
actions={[
    {
      icon: () => <Refresh/>,
      tooltip: 'Actualiser',
      isFreeAction: true,
      onClick: () => this.componentDidMount()
    }
  ]}

title='Liste de Réparateurs'
columns={this.state.col}
data={dt}
editable={{

    onRowAdd: newData =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        this.add(newData); 
        this.componentDidMount();
        resolve();
      }, 800)
    }),
  onRowUpdate: (newData, oldData) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        this.edit(newData);   
        this.componentDidMount();   

        resolve();
      }, 800)
    }),
  onRowDelete: oldData =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = oldData.id;
      this.remove(index);
      this.componentDidMount();
      
      
      resolve()
    }, 1300)
    
  }),
  }}
options={{
    headerStyle: {
        position: 'sticky', 
        top: 0, 
      backgroundColor: '#707cbd',
      color: '#F5F5F5',
      fontSize:'15px',
      fontWeight: 'bold'
    },
    maxBodyHeight: '70vh',
    exportButton: true,
    searchPlaceholder: "Rechercher",
    actionsColumnIndex: -1 
  }}

  localization={{
    body: {
        emptyDataSourceMessage: "Pas d'enregistrement à afficher",
        addTooltip: 'Ajouter',
        deleteTooltip: 'Supprimer',
        editTooltip: 'Editer',
        filterRow: {
            filterTooltip: 'Filtrer'
        },
        editRow: {
            deleteText: 'Voulez-vous supprimer cette ligne?',
            cancelTooltip: 'Annuler',
            saveTooltip: 'Enregistrer'
        }
    },
    grouping: {
        placeholder: "Tirer l'entête ...",
        groupedBy: 'Grouper par:'
    },
    header: {
        actions: 'Actions'
    },
    pagination: {
        labelDisplayedRows: '{from}-{to} de {count}',
        labelRowsSelect: 'lignes',
        labelRowsPerPage: 'lignes par page:',
        firstAriaLabel: 'Première page',
        firstTooltip: 'Première page',
        previousAriaLabel: 'Page précédente',
        previousTooltip: 'Page précédente',
        nextAriaLabel: 'Page suivante',
        nextTooltip: 'Page suivante',
        lastAriaLabel: 'Dernière page',
        lastTooltip: 'Dernière page'
    },
    toolbar: {
        addRemoveColumns: 'Ajouter ou supprimer des colonnes',
        nRowsSelected: '{0} ligne(s) sélectionée(s)',
        showColumnsTitle: 'Voir les colonnes',
        showColumnsAriaLabel: 'Voir les colonnes',
        exportTitle: 'Exporter',
        exportAriaLabel: 'Exporter',
        exportName: 'Exporter en CSV',
        searchTooltip: 'Chercher',
        searchPlaceholder: 'Chercher'
    }
}}

/>
    </div>)
}
}
export default RepaList;