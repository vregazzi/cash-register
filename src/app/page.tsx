"use client";
import React from "react";
import { useState } from "react";
import PurchaseItem from "./types/PurchaseItem";
import PurchaseItemLine from "./PurchaseItemLine";
import ProductEntry from "./ProductEntry";
import Table from "@mui/material/Table";
import { Box, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import PurchaseTotal from "./PurchaseTotal";
import CheckoutButton from "./CheckoutButton";
import { getItem } from "./util/api";

export default function Home() {
  const [listItems, setListItems] = useState<PurchaseItem[]>([]);
  const addItem = async (text: string) => {
    // Check if the item is already in the list
    // If it is, increment the quantity
    if (listItems.some((item) => item.id === text)) {
      setListItems((previousState) => {
        return previousState.map((entry) => {
          if (entry.id === text) {
            return { ...entry, quantity: entry.quantity + 1 };
          }
          return entry;
        });
      });
      return;
    }

    // Get the item from the inventory
    const item = await getItem(text);

    // If the item is not in the inventory, return
    if (item === null) {
      return;
    }

    // Add the item to the list
    setListItems([
      ...listItems,
      { name: item.name, id: item.id, price: item.price, quantity: 1 },
    ]);
  };

  // Remove an item from the list
  const removeItem = async (id: string) => {
    setListItems((previousState) => {
      return previousState.filter((entry) => {
        return entry.id !== id;
      });
    });
  };

  // Edit the quantity of an item in the list
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
      <Typography variant="h5">Cash Register</Typography>
      <Box sx={{ display: "flex" }}>
        <ProductEntry list={listItems} addItem={addItem} />
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
            <PurchaseItemLine
              item={item}
              list={listItems}
              deleteItem={removeItem}
              editItem={editItem}
              key={item.id}
            />
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
