import { Injectable } from "@angular/core";

/**
 * Class that manages application's status messages
 */
@Injectable({
  providedIn: 'root'
})

export class Utils {
  // Friendly message for the user
 public message: string;

  // 1 success | 2 fail
 public status: number;
}
