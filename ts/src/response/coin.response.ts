import { ITagResponse } from "./tag.response";
import { ITeamResponse } from "./team.response";

export interface ICoinResponse {
  id: string;
  name?: string;
  symbol?: string;
  rank?: number;
  is_new?: boolean;
  is_active?: boolean;
  type?: string;
  logo?: string;
  tags?: ITagResponse[];
  team?: ITeamResponse[];
  description?: string;
  message?: string;
  open_source?: boolean;
  started_at?: string;
  development_status?: string;
  hardware_wallet?: boolean;
  proof_type?: string;
  org_structure?: string;
  hash_algorithm?: string;
  links?: object;
  links_extended?: object;
  whitepaper?: object;
  first_data_at?: string;
  last_data_at?: string;
}
