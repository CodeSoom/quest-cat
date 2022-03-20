defmodule Cat do
  @moduledoc """
  cat 명령어의 구현체입니다.
  """

  require Utils
  require DefGuard

  @spec meow(Enum.t()) :: :ok
  defp meow(args) when DefGuard.help(args), do: IO.puts(Utils.manual())

  defp meow(args) do
    case File.read(hd(args)) do
      {:ok, body} -> IO.puts(body)
      {:error, _} -> IO.puts(Utils.notFound(hd(args)))
    end
  end

  @doc """
  파일을 읽은 뒤 출력합니다.

  ## Parameters

    - args: 파일의 경로를 입력합니다.

  ## Examples

    iex> Cat.main(["./README.md"])
    # Cat...
    :ok

  """
  @spec main(Enum.t()) :: :ok
  def main(args), do: meow(args)
end
