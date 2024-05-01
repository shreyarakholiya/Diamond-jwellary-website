import React from 'react'
import { Link } from 'react-router-dom'
import { TreeView, TreeItem } from '@material-ui/lab';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport"
import ListAltIcon from "@material-ui/icons/ListAlt"
import DashboardIcon from "@material-ui/icons/Dashboard"
import PeopleIcon from "@material-ui/icons/People"
import RateReviewIcon from "@material-ui/icons/RateReview"

const Sidebar = () => {
    return (
        <div className='sidebar'>
           
                    <Link className='text-decoration-none' to="/admin/dashboard">
                        <h5 className='mt-4'><DashboardIcon /><span className='ps-3'>Dashboard</span></h5>
                    </Link>
                    <Link>
                        <TreeView id='decor' defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ImportExportIcon />}>
                            <TreeItem  nodeId='1' label="Products">
                                <Link  to="/admin/products">
                                    <TreeItem className='decor' nodeId='2' label="All" icon={<PostAddIcon />}></TreeItem>
                                </Link>

                                <Link className='text-decoration-none' to="/admin/product">
                                    <TreeItem nodeId='3' label="Create" icon={<AddIcon />}></TreeItem>
                                </Link>
                            </TreeItem>
                        </TreeView>
                    </Link>
                    <Link className='text-decoration-none' to="/admin/orders">
                        <h5 className='mt-4'><ListAltIcon /><span className='ps-3'>Orders</span></h5>
                    </Link>
                    <Link className='text-decoration-none' to="/admin/users">
                        <h5 className='mt-4'><PeopleIcon /><span className='ps-3'>Users</span></h5>
                    </Link>
                    <Link className='text-decoration-none' to="/admin/reviews">
                        <h5 className='mt-4'><RateReviewIcon /><span className='ps-3'>Reviews</span></h5>
                    </Link>
                </div>
    )
}

export default Sidebar