import { supabase } from './supabaseClient';
import { User } from '../types/User';

export const fetchUsers = async (): Promise<User[]> => {  ///全データ取得fetchの代わり
  const { data, error } = await supabase
    .from<'dev_users', User>('dev_users') // テーブル名と型を2つ指定
    .select('*')                       ///sql風のコード「;」ごとに一文とみなす
    .eq('deleted', false); ///DBだとWHEREにあたる
  if (error) {
    throw error;
  }
  return data as User[];
};

export const fetchUserById = async (id: number): Promise<User | null> => {
  const { data, error } = await supabase
    .from<'dev_users', User>('dev_users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') { // No rows found
      return null;
    }
    throw error;
  }

  return data as User;
};

export const createUser = async (user: Omit<User, 'id' | 'deleted'>): Promise<User> => {
  const { data, error } = await supabase
    .from('dev_users')
    .insert(user)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data as User;
};

export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  const { data, error } = await supabase
    .from('dev_users')
    .update(user)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data as User;
};

export const deleteUser = async (id: number): Promise<void> => {
  const { data, error } = await supabase ///リアルタイムのデータ同期、認証、ロールベースのアクセス制御、ストレージなどの機能を提供
    .from('dev_users')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
};

export const softDeleteUser= async (id: number): Promise<void> => {///論理削除
  const { data, error } = await supabase///第一引数：データ　第二引数：エラー
    .from('dev_users')
    .update({deleted:true})
    .eq('id', id)

    if (error) {
      throw error;
    }
  };
