defmodule DefGuard do
  @moduledoc false

  @doc """
  -h 또는 --help 옵션으로 호출되었는지 확인합니다.
  """
  @spec help(Enum.t()) :: boolean()
  defguard help(args) when hd(args) === "-h" or hd(args) === "--help"
end
