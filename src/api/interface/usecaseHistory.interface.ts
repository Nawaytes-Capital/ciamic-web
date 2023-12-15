// {
//     "message": "Success",
//     "data": [
//         {
//             "_id": "6554eeda8f86aa551c0cc609",
//             "id_batch": "654608831120f3b7ed04aee2",
//             "created_at": "2023-11-15T16:16:26.836000Z"
//         },
//         {
//             "_id": "6554f85d8f86aa551c0cc60d",
//             "id_batch": "654608831120f3b7ed04aee2",
//             "created_at": "2023-11-15T16:57:01.755000Z"
//         },
//         {
//             "_id": "6554f86f8f86aa551c0cc60e",
//             "id_batch": "654608831120f3b7ed04aee2",
//             "created_at": "2023-11-15T16:57:19.906000Z"
//         },
//         {
//             "_id": "65697894ea1e0ca2ca07d7da",
//             "id_batch": "654608831120f3b7ed04aee2",
//             "created_at": "2023-12-01T06:09:24.587000Z"
//         },
//         {
//             "_id": "6572a938109151a3060fba22",
//             "id_batch": "65720b41109151a3060fba19",
//             "created_at": "2023-12-08T05:27:20.562000Z"
//         },
//         {
//             "_id": "6572ddbcc1614895610511dc",
//             "id_batch": "65720b41109151a3060fba19",
//             "created_at": "2023-12-08T09:11:24.211000Z"
//         },
//         {
//             "_id": "6576abd495891eff030f3ed2",
//             "id_batch": "65720b41109151a3060fba19",
//             "created_at": "2023-12-11T06:27:32.732000Z"
//         }
//     ]
// }

export interface UsecaseHistory {
  message: string;
  data: HistoryData[];
}

interface HistoryData {
  _id: string;
  id_batch: string;
  created_at: string;
}
