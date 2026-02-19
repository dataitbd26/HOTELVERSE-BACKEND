import { Router } from "express";

// Used Route Imports
import CompanyRoutes from "../app/modules/Company/Companys.routes.js";
import permissionRoutes from "../app/modules/Permission/permission.routes.js";
import userRoutes from "../app/modules/User/Users.routes.js";
import UserlogRoutes from "../app/modules/UserLog/UserLog.routes.js";
import TransactionLogRoutes from "../app/modules/TransactionLog/TransactionLog.routes.js";
import UserRoleRoutes from "../app/modules/UserRole/UserRoles.routes.js";
import rolepermissionRoutes from "../app/modules/RolePermission/rolePermission.routes.js";
import RoomCategoryRoutes from "../app/modules/RoomCategory/RoomCategories.routes.js";
import GuestRoutes from "../app/modules/Guest/Guests.routes.js";
import StayInfoRoutes from "../app/modules/StayInfo/StayInfos.routes.js";
import OrganizationRoutes from "../app/modules/Organization/Organizations.routes.js";
import PaymentMethodRoutes from "../app/modules/PaymentMethod/PaymentMethods.routes.js";
import LedgerRoutes from "../app/modules/Ledger/Ledgers.routes.js";
import BlockRoomRoutes from "../app/modules/BlockRoom/BlockRooms.routes.js";
import WorkOrderRoutes from "../app/modules/WorkOrder/WorkOrders.routes.js";
import HouseKeeperRoutes from "../app/modules/HouseKeeper/HouseKeepers.routes.js";
import HouseKeepingStatusRoutes from "../app/modules/HouseKeepingStatus/HouseKeepingStatus.routes.js";
import WorkOrderCategoryRoutes from "../app/modules/WorkOrderCategory/WorkOrderCategory.routes.js";
import RemarkHouseKeepingRoutes from "../app/modules/RemarkHouseKeeping/remarkHouseKeeping.routes.js";


// Used Controllers / Middleware
import { getImageUrl } from "../config/space.js";
import transactionLogger from "../middleware/transactionLogger.js";

const routes = Router();

// Middleware
routes.use(transactionLogger);

// Active Routes
routes.use("/company", CompanyRoutes);
routes.use("/permissions", permissionRoutes);
routes.use("/user", userRoutes);
routes.use("/userlog", UserlogRoutes);
routes.use("/transaction-logs", TransactionLogRoutes);
routes.use("/userrole", UserRoleRoutes);
routes.use("/role-permissions", rolepermissionRoutes);
routes.use("/roomcategory", RoomCategoryRoutes);
routes.use("/guest", GuestRoutes);
routes.use("/stayinfo", StayInfoRoutes);
routes.use("/organization", OrganizationRoutes);
routes.use("/paymentmethod", PaymentMethodRoutes);
routes.use("/ledger", LedgerRoutes);
routes.use("/blockroom", BlockRoomRoutes);
routes.use("/workorder", WorkOrderRoutes);
routes.use("/housekeeper", HouseKeeperRoutes);
routes.use("/housekeeping-status", HouseKeepingStatusRoutes);
routes.use("/workorder-category", WorkOrderCategoryRoutes);
routes.use("/remark-housekeeping", RemarkHouseKeepingRoutes);
routes.post("/get-image-url", getImageUrl);

export default routes;
