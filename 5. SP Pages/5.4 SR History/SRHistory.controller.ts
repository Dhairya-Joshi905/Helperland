import exceljs from "exceljs";
import { Request, Response, RequestHandler } from "express";

import { SRHistoryService } from "./SRHistory.service";
import { Rating } from "../../models/rating";
import { ServiceRequest } from "../../models/servicerequest";

require("dotenv").config();

export class SRHistoryController {
  public constructor (private readonly serviceHistoryService: SRHistoryService) {
    this.serviceHistoryService = serviceHistoryService;
  }

  public getSRHistory: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    return this.serviceHistoryService
      .getSPSRHistory(parseInt(req.body.userId))
      .then(async (SRHistory: ServiceRequest[] | null) => {
        if (SRHistory) {
          if (SRHistory.length > 0) {
            const pastDateHistory = this.serviceHistoryService.compareWithCurrentDate(SRHistory);
            if (SRHistory.length > 0) {
              const historyData = await this.serviceHistoryService.gethistoryForDisplay(pastDateHistory);
              if (historyData.length > 0)
                return res.status(200).json(historyData);
              else return res.status(404).json({ message: 'Service request history not found in past' });
            }
            else return res.status(404).json({ message: 'Service request history not found in past' });
          }
          else return res.status(404).json({ message: 'Service request history empty' });
        }
        else return res.status(404).json({ message: 'Service request not found' });
      })
      .catch((err: Error) => res.status(500).json({error: err}));
  };

  public getSRDetailById: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    // console.log(req.body);
    const Id = parseInt(req.params.SRId);
    if (req.body.userTypeId === 3)
      return this.serviceHistoryService
        .getServiceRequestDetailById(Id)
        .then((SRDetail: ServiceRequest | null) => {
          // Why this question mark?
          if (SRDetail?.ServiceProviderId === req.body.userId)
            return res.status(200).json(SRDetail);
          else return res.status(404).json({ message: "No service request detail found for this request" });
        })
        .catch((err: Error) => res.status(500).json({error: err}));
    else return res.status(401).json({ message: "Unauthorised User" });
  };

  // public exportDataInExcelFormat: RequestHandler = async (req: Request, res: Response): Promise<Response|void> => {
  //   let exportHistory: Object[] = [];
  //   return this.serviceHistoryService
  //     .getSPSRHistory(parseInt(req.body.userId))
  //     .then(async requestHistory => {
  //       if (requestHistory) {
  //         if (requestHistory.length>0){
  //           const pastDateHistory = this.serviceHistoryService.compareWithCurrentDate(requestHistory);
  //           if (requestHistory.length>0){
  //             exportHistory = await this.serviceHistoryService.getDatForExport(pastDateHistory);
  //             let workbook = new exceljs.Workbook();
  //             let worksheet = workbook.addWorksheet("history");
  //             worksheet.columns = [
  //               { header: "ServiceId" ,   key: "ServiceId", width: 25 },
  //               { header: "StartDate" ,   key: "StartDate", width: 25 },
  //               { header: "Customer"  ,   key: "Customer" , width: 25 },
  //               { header: "Payment"   ,   key: "Payment"  , width: 10 },
  //             ];
  //             worksheet.addRows(exportHistory);
  //             res.setHeader(
  //               "Content-Type",
  //               "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //             );
  //             res.setHeader(
  //               "Content-Disposition",
  //               "attachment; filename=" + "history.xlsx"
  //             );
  //             return workbook.xlsx.write(res).then((err) => res.status(200).end());
  //           }
  //           else return res.status(404).json({ message: 'No data to export' });
  //         }
  //         else return res.status(404).json({ message: 'No data to export' });
  //       }
  //       else return res.status(404).json({ message: 'No data to export' });
  //     })
  //     .catch((err: Error) => res.status(500).json({error: err}));
  // };

  public getSPRating: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    if (req.body.userTypeId === 3 && req.body.userId)
      return this.serviceHistoryService
        .getRatingsOfHelper(req.body.userId)
        .then(async (ratings: Rating[] | null) => {
          if (ratings) {
            const displaydate = await this.serviceHistoryService.getRatingsForDisplay(ratings);
            if (displaydate.length > 0)
              return res.status(200).json(displaydate);
            else return res.status(404).json({ message: "No ratings yet." });
          }
          else return res.status(404).json({ message: "ratings not found" });
        })
        .catch((err: Error) => {
          // console.log(err);
          return res.status(500).json({error: err})
        });
    else return res.status(401).json({ message: "Unauthorised User" });
  };
}
