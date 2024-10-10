"use client";
import React from 'react';
import { useState } from 'react';
import PurchaseItem from './types/PurchaseItem';
import PurchaseItemLine from './PurchaseItemLine';
import ProductEntry from './ProductEntry';
import Table from "@mui/material/Table";
import { Box, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import PurchaseTotal from './PurchaseTotal';
import CheckoutButton from './CheckoutButton';

interface AppProps {
  items: PurchaseItem[];
}

export default function Home(props: AppProps) {
  const [listItems, setListItems] = useState<PurchaseItem[]>([
    {
      name: 'Apple',
      id: '1',
      price: 1.00,
      quantity: 1
    },
    {
      name: 'Banana',
      id: '2',
      price: 0.50,
      quantity: 2
    },
    {
      name: 'Cherry',
      id: '3',
      price: 0.25,
      quantity: 3
    }
  ]);

  const addItem = async (text: string) => {
    setListItems([...listItems, { name: text, id: '0', price: 1, quantity: 1 }]);
  };

  const removeItem = async (id: string) => {
    setListItems((previousState) => {
      return previousState.filter((entry) => {
        return entry.id !== id;
      });
    });
  };

  const editItem = async (name: string, quantity: number) => {
    setListItems((previousState) => {
      return previousState.map((entry) => {
        if (entry.name === name) {
          return { ...entry, quantity: quantity };
        }
        return entry;
      });
    });
  };

  return (
    <Box sx={{ m: 4 }}>
      <Typography variant="h5">Cash Register</Typography >
      <Box sx={{ display: 'flex' }}>
        <ProductEntry list={listItems} setList={setListItems} />
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        <CheckoutButton list={listItems} />
      </Box>
      <Table sx={{ maxWidth: 500 }}>
        <TableBody>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
          {listItems.map((item) => (
            <PurchaseItemLine item={item} list={listItems} deleteItem={removeItem} editItem={editItem} />
          ))}
          <TableRow>
            <TableCell colSpan={1} />
            <TableCell>
              <PurchaseTotal list={listItems} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}
