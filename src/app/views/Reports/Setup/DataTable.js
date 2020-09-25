import React from 'react'
import { TableBody, TableRow, TableCell } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Dot from '../../../components/statusDot'
import VisibilityIcon from '@material-ui/icons/Visibility';
import Controls from '../../../components/controls/Controls'

const DataTable = (props) => {
    const {
        TblContainer,
        TblHead,
        recordsAfterPagingAndSorting,
        openInPopup,
        onDelete,
        setConfirmDialog
    } = props

    return (
        <TblContainer>
            <TblHead />
            <TableBody>
                {
                    recordsAfterPagingAndSorting().map((item) => (
                        <TableRow key={item._id}>
                            <TableCell >
                                {item.isSync ? <Dot color={'green'} position="center" mx={2} Size={10} />
                                    : <Dot color={'red'} position="center" mx={2} Size={10} />}
                            </TableCell>
                            <TableCell>{item.OrderSno}</TableCell>
                            <TableCell>{item.OrderType}</TableCell>
                            <TableCell>{item.taxAmount}</TableCell>
                            <TableCell>{item.discount}</TableCell>
                            <TableCell>{item.total}</TableCell>
                            <TableCell>{item.reciveAmount}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>
                                <Controls.ActionButton
                                    color="primary"
                                    onClick={() => { openInPopup(item) }}
                                >
                                    <VisibilityIcon fontSize="inherit" />
                                </Controls.ActionButton>
                                <Controls.ActionButton
                                    color="secondary"
                                    onClick={() => {
                                        setConfirmDialog({
                                            isOpen: true,
                                            title: 'Are you sure to delete this record?',
                                            subTitle: "You can't undo this operation",
                                            onConfirm: () => { onDelete(item._id) }
                                        })
                                    }}>
                                    <DeleteIcon fontSize="inherit" />
                                </Controls.ActionButton>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </TblContainer>
    )
}
export default DataTable