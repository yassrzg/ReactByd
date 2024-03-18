import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../../../Context/contextProduct";
import '../admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import data from "bootstrap/js/src/dom/data";


export default function GetAllProduct() {
    const { produit, deleteProduit, updateProduit } = useContext(ProductContext);


    const handleDeleteProduit = (produitId) => {
        deleteProduit(produitId);
    };
    const imageTemplate = (rowData) => {
        return <img src={rowData.image} alt="Produit" />;
    };







    return (
        <div>
        <table className="border-separate border border-slate-500">
            <thead>
            {/* ... En-tête du tableau ... */}
            </thead>
            <tbody>
            {produit.map((produitItem) => (
                <tr key={produitItem.id}>
                    <td className="border border-slate-700">{produitItem.title}</td>
                    <td className="border border-slate-700"><img src={produitItem.image} alt="Produit" /></td>
                    <td className="border border-slate-700">{produitItem.prix} €</td>
                    <td className="border border-slate-700">boolean</td>
                    <td className="border border-slate-700">{produitItem.description}</td>
                    <td className="border border-slate-700">
                        <button onClick={() => handleDeleteProduit(produitItem.id)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
            <div className="card">
                <DataTable value={produit} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="title" header="Title" sortable style={{ width: '25%' }} />
                    <Column body={imageTemplate} header="Image" style={{ width: '25%' }} />
                    <Column field="prix" header="Price" sortable style={{ width: '25%' }} />
                    <Column field="category" header="Category" sortable style={{ width: '25%' }} />
                </DataTable>

            </div>
        </div>

    );
}
