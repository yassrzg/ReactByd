import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { ProductContext } from '../../../Context/contextProduct';
import {InputSwitch} from "primereact/inputswitch";
import { Dialog } from 'primereact/dialog';


import 'primeicons/primeicons.css';


export default function ShowProduct() {
    const { produit, deleteProduit, updateProduit } = useContext(ProductContext);
    const [productToDelete, setProductToDelete] = useState(null); // Pour stocker l'ID du produit à supprimer


    const handleDeleteConfirmation = (productId) => {
        setProductToDelete(productId); // Stocke l'ID du produit dans l'état local
        setVisible(true); // Affiche la modale de confirmation
    };

    const handleDeleteProduit = (productId) => {
        deleteProduit(productId);
        setProductToDelete(null); // Réinitialise l'ID du produit à supprimer
        setVisible(false); // Masque la modale de confirmation
    };

    const imageBodyTemplate = (product) => {
        return <img src={product.image} alt="Produit" />;
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    const priceBodyTemplate = (product) => {
        return formatCurrency(product.prix);
    };

    const categoryBodyTemplate = (product) => {
        return 'hello'
    }

    const customBodyTemplate = (product) => {

        return  <InputSwitch  value={product.value}/>
    }

    const deleteBodyTemplate = (product) => {
        // return <i className="pi pi-trash" onClick={() => handleDeleteProduit(product.id)}></i>;
        return <Button label="Delete" icon="pi pi-trash" onClick={() => setVisible(true)} />
    };


    const stripHtmlTags = (html) => {
        var temporalDivElement = document.createElement('div');
        temporalDivElement.innerHTML = html;
        return temporalDivElement.textContent || temporalDivElement.innerText || '';
    };

    const footer = `Au total vous avez : ${produit ? produit.length : 0} produits.`;


    // BUTTON DELETE

    const [visible, setVisible] = useState(false);


    return (
        <div className="card">
            <DataTable value={produit} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                <Column header="Image" body={imageBodyTemplate}></Column>
                <Column field="title" header="Titre"></Column>
                <Column header="Description" field="description" body={(data) => stripHtmlTags(data.description)}></Column>
                <Column field="prix" header="Prix" body={priceBodyTemplate}></Column>
                <Column field="category" header="Catégorie" body={categoryBodyTemplate}></Column>
                <Column field="custom" header="Personnalisation" body={customBodyTemplate}></Column>
                <Column field="Home Page" header="Nouvelle collection" body={customBodyTemplate}></Column>
                <Column body={(data) => (
                    <Button
                        label="Delete"
                        icon="pi pi-trash"
                        onClick={() => handleDeleteConfirmation(data.id)} // Appelle la fonction de confirmation
                    />
                )}></Column>
            </DataTable>
            <div className="card flex justify-content-center">
                <Dialog
                    header="Supprimer un produit"
                    visible={visible}
                    style={{ width: '50vw' }}
                    onHide={() => setVisible(false)}
                >
                    <p className="m-0">
                        Êtes-vous sûr de vouloir supprimer ?
                    </p>
                    <div>
                        <Button
                            label="Yes"
                            icon="pi pi-times"
                            onClick={() => handleDeleteProduit(productToDelete)} // Appelle la fonction de suppression
                            className="p-button-text"
                        />
                        <Button
                            label="No"
                            icon="pi pi-check"
                            onClick={() => setVisible(false)}
                            autoFocus
                        />
                    </div>
                </Dialog>
            </div>
        </div>
    );
}
