import { createObjectCsvWriter } from 'csv-writer';
import type { ObjectCsvWriterParams } from 'csv-writer/src/lib/csv-writer-factory';
import * as fs from 'fs';

export const CsvWriteMode = {
    APPEND: 1,
    REPLACE: 2,
} as const;

export type CsvWriteMode = typeof CsvWriteMode[keyof typeof CsvWriteMode];


export type CsvWriteOptions = Partial<ObjectCsvWriterParams> & {
    rows: any[]
    writeMode: CsvWriteMode
}

export async function writeCsvFile({ path, header, rows, writeMode }: CsvWriteOptions): Promise<void> {
  
  
  if (writeMode == CsvWriteMode.REPLACE && fs.existsSync(path)) {
    fs.unlinkSync(path);
  }

  const csvWriter = createObjectCsvWriter({
    path: path,
    header: header,
    append: writeMode == CsvWriteMode.APPEND
  });

  await csvWriter.writeRecords(rows);
  console.log(`CSV file written to ${path}`);
}